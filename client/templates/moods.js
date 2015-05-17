var x;
var y;
var dragging = false;

Session.setDefault("brush", "select");

var moods = [
    {
        name: "Happy",
        icon: "happy.svg"
    },
    {
        name: "Sad",
        icon: "sad.svg"
    },
    {
        name: "Romantic",
        icon: "romantic.svg"
    },
    {
        name: "Festive",
        icon: "festive.svg"
    },
    {
        name: "Energetic",
        icon: "energetic.svg"
    },
    {
        name: "Bombastic",
        icon: "bombastic.svg"
    },
    {
        name: "Uplifting",
        icon: "uplifting.svg"
    },
    {
        name: "Aggressive",
        icon: "aggressive.svg"
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

    $(document).ready(function() {
        Meteor.setTimeout(function(){
            console.log("width", $("#canvasContainer").width());
            lower.canvas.width  = $("#canvasContainer").width();
            lower.canvas.height = $("#canvasContainer").height() - 80;
            upper.canvas.width  = $("#canvasContainer").width();
            upper.canvas.height = $("#canvasContainer").height() - 80;
        }, 300);
    });

});

Template.moods.helpers({
    moods: function() {
        return moods;
    },
    randomW: function() {
        var number = Math.floor((Math.random() * 3) + 1);

        return "w" + number;
    },
    brushIs: function(brush) {
        return Session.get("brush") === brush;
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

        _.each(moods, function(mood) {
            var mood = $("#" + mood.name);
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
                paintedCircles.push(mood.name);
                if (Session.get("brush") === "select") {
                    mood.css({backgroundColor: "#80cbc4"});
                } else if (Session.get("brush") === "ban") {
                    mood.css({backgroundColor: "#ef9a9a"});
                }
            }
        });

    }
});

//Template.moods.gestures({
//    'pinchout #upper': function (event, template) {
//
//        var x, y;
//        x = event.center.x;
//        y = event.center.y;
//
//        _.each(moods, function(mood) {
//            var mood = $("#" + mood.name);
//            var offset = mood.offset();
//
//            var moodCoordinates = {
//                xStart: offset.left,
//                xEnd: offset.left + mood.width(),
//                yStart: offset.top,
//                yEnd: offset.top + mood.height()
//            };
//
//            var xPinch = false;
//            var yPinch = false;
//
//            if (x >= moodCoordinates.xStart && x <= moodCoordinates.xEnd) {
//                xPinch = true;
//            }
//
//            if (y >= moodCoordinates.yStart && y <= moodCoordinates.yEnd) {
//                yPinch = true;
//            }
//
//            if (xPinch && yPinch) {
//
//                var genre = mood[0].innerHTML;
//
//                Router.go("genre", {genre: genre});
//            }
//        });
//    }
//});