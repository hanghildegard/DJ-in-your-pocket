var x;
var y;
var dragging = false;

Session.setDefault("brush", "select");

var onShakeMoods = _.debounce(function onShake() {
    var playlist = Session.get("currentPlaylist");
    playlist.selectedMoods = [];
    playlist.bannedMoods = [];

    Session.set("currentPlaylist", playlist);

    Meteor.call("updatePlaylist", playlist, function () {
    });
}, 750, true);

var moods = [
    {
        name: "Happy",
        icon: "happy.svg",
        metaId: "12"
    },
    {
        name: "Sad",
        icon: "sad.svg",
        metaId: "13"
    },
    {
        name: "Romantic",
        icon: "romantic.svg",
        metaId: "8"
    },
    {
        name: "Festive",
        icon: "festive.svg",
        metaId: "18"
    },
    {
        name: "Energetic",
        icon: "energetic.svg",
        metaId: "11"
    },
    {
        name: "Bombastic",
        icon: "bombastic.svg",
        metaId: "28"
    },
    {
        name: "Uplifting",
        icon: "uplifting.svg",
        metaId: "10"
    },
    {
        name: "Aggressive",
        icon: "aggressive.svg",
        metaId: "14"
    }
];

var lower;
var upper;

function drawStroke(ctx){
    var i;
    var gCO = ctx.globalCompositeOperation;
    ctx.globalCompositeOperation = "destination-out";
    ctx.strokeStyle = "rgba(0,0,0,1)";
    ctx.lineWidth=30 ;
    ctx.beginPath() ;
    ctx.moveTo(x[0], y[0]);
    for (i=1; i < x.length; i++){
        ctx.lineTo(x[i],y[i]) ;
    }
    ctx.stroke();

    var i ;
    ctx.globalCompositeOperation = gCO;

    if (Session.get("brush") !== "erase") {
        if (Session.get("brush") === "select") {
            ctx.strokeStyle='rgba(0,0,0,0.5)' ;
        } else {
            ctx.strokeStyle='rgba(255,0,0,0.5)' ;
        }
        ctx.lineWidth=30 ;
        ctx.beginPath() ;
        ctx.moveTo(x[0], y[0]);
        for (i=1; i < x.length; i++){
            ctx.lineTo(x[i],y[i]) ;
        }
        ctx.stroke();
    }
}

Template.moods.onRendered(function() {

    lower = $('#lower').get(0).getContext('2d') ;
    upper = $('#upper').get(0).getContext('2d') ;

    shake.startWatch(function () {
        lower.clearRect(0, 0, $("#canvasContainer").width(), $("#canvasContainer").height());
        onShakeMoods();
    }, 30);


    $(document).ready(function() {
        Meteor.setTimeout(function(){
            lower.canvas.width  = $("#canvasContainer").width();
            lower.canvas.height = $("#canvasContainer").height() - 80;
            upper.canvas.width  = $("#canvasContainer").width();
            upper.canvas.height = $("#canvasContainer").height() - 80;
        }, 300);
    });

});


Template.moods.onDestroyed(function() {
    shake.stopWatch();
});

Template.moods.helpers({
    moods: function() {
        return moods;
    },
    brushIs: function(brush) {
        return Session.get("brush") === brush;
    },
    status: function(metaId) {
        if (Session.get("currentPlaylist").selectedMoods.indexOf(metaId) > -1)
            return 'selected';
        else if (Session.get("currentPlaylist").bannedMoods.indexOf(metaId) > -1)
            return 'banned';
    }
});

Template.banBrush.events({
    "click": function() {
        Session.set("brush", "ban");
    }
});

Template.selectBrush.events({
    "click": function() {
        Session.set("brush", "select");
    }
});

Template.moods.events({
    "mousedown #upper, touchstart #upper": function(e) {

        if (typeof e.originalEvent.touches === "undefined") {
            x = [e.originalEvent.layerX];
            y = [e.originalEvent.layerY - 40];
        } else {
            var touch = e.originalEvent.touches[0];
            x = [touch.pageX];
            y = [touch.pageY - 40];
        }

        dragging = true;
    },
    "mousemove #upper, touchmove #upper": function(e) {
        if (dragging){

            if (typeof e.originalEvent.touches === "undefined") {
                x.push(e.originalEvent.layerX);
                y.push(e.originalEvent.layerY);
            } else {
                var touch = e.originalEvent.touches[0];
                x.push(touch.pageX);
                y.push(touch.pageY - 40);
            }

            upper.clearRect(0,0,upper.canvas.width,upper.canvas.height) ;
            drawStroke(upper);
        }
    },
    "mouseup #upper, touchend #upper": function() {
        dragging = false;
        upper.clearRect(0,0,upper.canvas.width,upper.canvas.height) ;
        drawStroke(lower);

        var paintedCircles = [];

        console.log(moods);

        var selectedCircles = Session.get("currentPlaylist").selectedMoods;
        var bannedCircles = Session.get("currentPlaylist").bannedMoods;

        _.each(moods, function(item) {
            var mood = $("#" + item.metaId);
            var offset = mood.offset();
            var moodCoordinates = {
                xStart: offset.left,
                xEnd: offset.left + mood.width(),
                yStart: offset.top - 60,
                yEnd: offset.top - 60 + mood.height()
            };

            var xPaintedOver = false;
            var yPaintedOver = false;

            _.each(x, function(value) {
                if (value >= moodCoordinates.xStart && value <= moodCoordinates.xEnd) {
                    xPaintedOver = true;
                }
            });

            _.each(y, function(value) {
                if (value >= moodCoordinates.yStart && value <= moodCoordinates.yEnd) {
                    yPaintedOver = true;
                }
            });

            var paintedOver = false;

            if (xPaintedOver && yPaintedOver) {
                if (Session.get("brush") === "select") {
                    if (selectedCircles.indexOf(item.metaId) < 0) {
                        selectedCircles.push(item.metaId);
                    }

                    if (bannedCircles.indexOf(item.metaId) > -1) {
                        bannedCircles.splice(bannedCircles.indexOf(item.metaId), 1);
                    }
                } else if (Session.get("brush") === "ban") {
                    if (bannedCircles.indexOf(item.metaId) < 0) {
                        bannedCircles.push(item.metaId);
                    }

                    if (selectedCircles.indexOf(item.metaId) > -1) {
                        selectedCircles.splice(selectedCircles.indexOf(item.metaId), 1);
                    }
                }
            }
        });

        var playlist = Session.get("currentPlaylist");
        playlist.selectedMoods = selectedCircles;
        playlist.bannedMoods = bannedCircles;

        console.log(playlist);

        Session.set("currentPlaylist", playlist);

        Meteor.call("updatePlaylist", Session.get("currentPlaylist"), function() {
            
        });

    }
});