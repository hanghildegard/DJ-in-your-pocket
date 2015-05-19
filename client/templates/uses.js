/**
 * Created by hangdominh on 19/05/15.
 */
var x;
var y;
var dragging = false;

Session.setDefault("brush", "select");

var onShakeUses = _.debounce(function onShake() {
    var playlist = Session.get("currentPlaylist");
    playlist.selectedUses = [];
    playlist.bannedUses = [];

    Session.set("currentPlaylist", playlist);

    Meteor.call("updatePlaylist", playlist, function () {
    });
}, 750, true);

var uses = [
    {
        name: "Background",
        icon: "background.svg",
        metaId: "12"
    },
    {
        name: "Ballroom",
        icon: "ballroom.svg",
        metaId: "13"
    },
    {
        name: "Children's songs",
        icon: "children's songs.svg",
        metaId: "8"
    },
    {
        name: "Drinking songs",
        icon: "drinking songs.svg",
        metaId: "18"
    },
    {
        name: "Exercise",
        icon: "exercise.svg",
        metaId: "11"
    },
    {
        name: "Flamenco",
        icon: "flamenco22 kopio.svg",
        metaId: "28"
    },
    {
        name: "Jogging",
        icon: "jogging.svg",
        metaId: "10"
    },
    {
        name: "Party",
        icon: "party.svg",
        metaId: "14"
    },
    {
        name: "Sing along",
        icon: "sing along.svg",
        metaId: "15"
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

Template.uses.onRendered(function() {

    lower = $('#lower').get(0).getContext('2d') ;
    upper = $('#upper').get(0).getContext('2d') ;

    shake.startWatch(function () {
        lower.clearRect(0, 0, $("#canvasContainer").width(), $("#canvasContainer").height());
        onShakeUses();
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


Template.uses.onDestroyed(function() {
    shake.stopWatch();
});

Template.uses.helpers({
    uses: function() {
        return uses;
    },
    brushIs: function(brush) {
        return Session.get("brush") === brush;
    },
    status: function(metaId) {
        if (Session.get("currentPlaylist").selectedUses.indexOf(metaId) > -1)
            return 'selected';
        else if (Session.get("currentPlaylist").bannedUses.indexOf(metaId) > -1)
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

Template.uses.events({
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

        console.log(uses);

        var selectedCircles = Session.get("currentPlaylist").selectedUses;
        var bannedCircles = Session.get("currentPlaylist").bannedUses;

        _.each(uses, function(item) {
            var use = $("#" + item.metaId);
            var offset = use.offset();
            var useCoordinates = {
                xStart: offset.left,
                xEnd: offset.left + use.width(),
                yStart: offset.top - 60,
                yEnd: offset.top - 60 + use.height()
            };

            var xPaintedOver = false;
            var yPaintedOver = false;

            _.each(x, function(value) {
                if (value >= useCoordinates.xStart && value <= useCoordinates.xEnd) {
                    xPaintedOver = true;
                }
            });

            _.each(y, function(value) {
                if (value >= useCoordinates.yStart && value <= useCoordinates.yEnd) {
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
        playlist.selectedUses = selectedCircles;
        playlist.bannedUses = bannedCircles;

        console.log(playlist);

        Session.set("currentPlaylist", playlist);

        //Meteor.call("updatePlaylist", Session.get("currentPlaylist"), function() {
        //
        //});

    }
});