/**
 * Created by hangdominh on 18/05/15.
 */
/**
 * Created by hangdominh on 18/05/15.
 */
var x;
var y;
var dragging = false;

Session.setDefault("brush", "select");

var themes = [
    {
        name: "Army",
        icon: "army.svg",
        metaId: "9"
    },
    {
        name: "Christmas",
        icon: "christmas.svg",
        metaId: "1"
    },
    {
        name: "Eurovision song contest",
        icon: "eurovision song contest.svg",
        metaId: "11"
    },
    {
        name: "Halloween",
        icon: "halloween.svg",
        metaId: "17"
    },
    {
        name: "Ice-hockey",
        icon: "ice-hockey.svg",
        metaId: "2"
    },
    {
        name: "Love",
        icon: "love.svg",
        metaId: "3"
    },
    {
        name: "Movies",
        icon: "movies.svg",
        metaId: "5"
    },
    {
        name: "Musicals",
        icon: "musicals.svg",
        metaId: "14"
    },
    {
        name: "Singing contests",
        icon: "singing contests.svg",
        metaId: "13"
    },
    {
        name: "Spiritual",
        icon: "spiritual.svg",
        metaId: "8"
    },
    {
        name: "Summer",
        icon: "summer.svg",
        metaId: "7"
    },
    {
        name: "TV",
        icon: "tv.svg",
        metaId: "15"
    },
    {
        name: "Wedding",
        icon: "wedding.svg",
        metaId: "10"
    }
];

var onShakeThemes = _.debounce(function onShake() {
    var playlist = Session.get("currentPlaylist");

    playlist.selectedThemes = [];
    playlist.bannedThemes = [];

    Session.set("currentPlaylist", playlist);

    Meteor.call("updatePlaylist", playlist, function () {
    });
}, 750, true);

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

Template.themes.onRendered(function() {

    lower = $('#lower').get(0).getContext('2d') ;
    upper = $('#upper').get(0).getContext('2d') ;

    shake.startWatch(function () {
        lower.clearRect(0, 0, $("#canvasContainer").width(), $("#canvasContainer").height());
        onShakeThemes();
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


Template.themes.onDestroyed(function() {
    shake.stopWatch();
});

Template.themes.helpers({
    themes: function() {
        return themes;
    },
    brushIs: function(brush) {
        return Session.get("brush") === brush;
    },
    status: function(metaId) {
        if (Session.get("currentPlaylist").selectedThemes.indexOf(metaId) > -1)
            return 'selected';
        else if (Session.get("currentPlaylist").bannedThemes.indexOf(metaId) > -1)
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

Template.themes.events({
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

        var selectedCircles = Session.get("currentPlaylist").selectedThemes;
        var bannedCircles = Session.get("currentPlaylist").bannedThemes;

        _.each(themes, function(item) {
            var theme = $("#" + item.metaId);
            var offset = theme.offset();
            var themeCoordinates = {
                xStart: offset.left,
                xEnd: offset.left + theme.width(),
                yStart: offset.top - 60,
                yEnd: offset.top - 60 + theme.height()
            };

            var xPaintedOver = false;
            var yPaintedOver = false;

            _.each(x, function(value) {
                if (value >= themeCoordinates.xStart && value <= themeCoordinates.xEnd) {
                    xPaintedOver = true;
                }
            });

            _.each(y, function(value) {
                if (value >= themeCoordinates.yStart && value <= themeCoordinates.yEnd) {
                    yPaintedOver = true;
                }
            });

            var paintedOver = false;

            var instrumental = false;

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
        playlist.selectedThemes = selectedCircles;
        playlist.bannedThemes = bannedCircles;

        console.log(playlist);

        Session.set("currentPlaylist", playlist);

        Meteor.call("updatePlaylist", Session.get("currentPlaylist"), function() {

        });

    }
});