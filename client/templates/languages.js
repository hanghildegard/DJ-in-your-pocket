/**
 * Created by hangdominh on 19/05/15.
 */
var x;
var y;
var dragging = false;

Session.setDefault("brush", "select");

var onShakeLanguages = _.debounce(function onShake() {
    var playlist = Session.get("currentPlaylist");
    playlist.selectedLanguages = [];
    playlist.bannedLanguages = [];

    Session.set("currentPlaylist", playlist);

    Meteor.call("updatePlaylist", playlist, function () {
    });
}, 750, true);

var languages = [
    {
        name: "Czech",
        icon: "czech.svg",
        metaId: "13"
    },
    {
        name: "English",
        icon: "english.svg",
        metaId: "2"
    },
    {
        name: "Finnish",
        icon: "finnish.svg",
        metaId: "1"
    },
    {
        name: "French",
        icon: "french.svg",
        metaId: "7"
    },
    {
        name: "German",
        icon: "german.svg",
        metaId: "5"
    },
    {
        name: "Greek",
        icon: "greek.svg",
        metaId: "15"
    },
    {
        name: "Italian",
        icon: "italian.svg",
        metaId: "6"
    },
    {
        name: "Japanese",
        icon: "japanese.svg",
        metaId: "8"
    },
    {
        name: "Norwegian",
        icon: "norwegian.svg",
        metaId: "12"
    },
    {
        name: "Polish",
        icon: "polish.svg",
        metaId: "14"
    },
    {
        name: "Portuguese",
        icon: "portuguese.svg",
        metaId: "11"
    },
    {
        name: "Russian",
        icon: "russian.svg",
        metaId: "9"
    },
    {
        name: "Spanish",
        icon: "spanish.svg",
        metaId: "4"
    },
    {
        name: "Swedish",
        icon: "swedish.svg",
        metaId: "3"
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

Template.languages.onRendered(function() {

    lower = $('#lower').get(0).getContext('2d') ;
    upper = $('#upper').get(0).getContext('2d') ;

    shake.startWatch(function () {
        lower.clearRect(0, 0, $("#canvasContainer").width(), $("#canvasContainer").height());
        onShakeLanguages();
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


Template.languages.onDestroyed(function() {
    shake.stopWatch();
});

Template.languages.helpers({
    languages: function() {
        return languages;
    },
    brushIs: function(brush) {
        return Session.get("brush") === brush;
    },
    status: function(metaId) {
        if (Session.get("currentPlaylist").selectedLanguages.indexOf(metaId) > -1)
            return 'selected';
        else if (Session.get("currentPlaylist").bannedLanguages.indexOf(metaId) > -1)
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

Template.languages.events({
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

        console.log(languages);

        var selectedCircles = Session.get("currentPlaylist").selectedLanguages;
        var bannedCircles = Session.get("currentPlaylist").bannedLanguages;

        _.each(languages, function(item) {
            var language = $("#" + item.metaId);
            var offset = language.offset();
            var languageCoordinates = {
                xStart: offset.left,
                xEnd: offset.left + language.width(),
                yStart: offset.top - 60,
                yEnd: offset.top - 60 + language.height()
            };

            var xPaintedOver = false;
            var yPaintedOver = false;

            _.each(x, function(value) {
                if (value >= languageCoordinates.xStart && value <= languageCoordinates.xEnd) {
                    xPaintedOver = true;
                }
            });

            _.each(y, function(value) {
                if (value >= languageCoordinates.yStart && value <= languageCoordinates.yEnd) {
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
        playlist.selectedLanguages = selectedCircles;
        playlist.bannedLanguages = bannedCircles;

        console.log(playlist);

        Session.set("currentPlaylist", playlist);

        Meteor.call("updatePlaylist", Session.get("currentPlaylist"), function() {

        });

    }
});