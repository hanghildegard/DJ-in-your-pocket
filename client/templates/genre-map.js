var x;
var y;
var dragging = false;

Session.setDefault("brush", "select");

var circles = [];
Tracker.autorun(function() {
    circles = Genres.find({type: "primary"}).fetch();
});

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

Template.genreMap.onRendered(function() {

    lower = $('#lower').get(0).getContext('2d') ;
    upper = $('#upper').get(0).getContext('2d') ;

    lower.canvas.width  = window.innerWidth;
    lower.canvas.height = window.innerHeight - 80;
    upper.canvas.width  = window.innerWidth;
    upper.canvas.height = window.innerHeight - 80;

});

Template.genreMap.helpers({
    circles: function() {
        return Genres.find({type: "primary"});
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

Template.genreMap.events({
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

        console.log(circles);

        _.each(circles, function(circle) {
            var circle = $("#" + circle._id);
            var offset = circle.offset();
            var circleCoordinates = {
                xStart: offset.left,
                xEnd: offset.left + circle.width(),
                yStart: offset.top - 60,
                yEnd: offset.top - 60 + circle.height()
            };

            var xPaintedOver = false;
            var yPaintedOver = false;

            _.each(x, function(value) {
                if (value >= circleCoordinates.xStart && value <= circleCoordinates.xEnd) {
                    xPaintedOver = true;
                }
            });

            _.each(y, function(value) {
                if (value >= circleCoordinates.yStart && value <= circleCoordinates.yEnd) {
                    yPaintedOver = true;
                }
            });

            var paintedOver = false;

            if (xPaintedOver && yPaintedOver) {
                paintedCircles.push(circle._id);
                if (Session.get("brush") === "select") {
                    circle.css({backgroundColor: "#80cbc4"});
                } else if (Session.get("brush") === "ban") {
                    circle.css({backgroundColor: "#ef9a9a"});
                }
            }
        });

    }
});

//Template.genreMap.gestures({
//    'pinchout #upper': function (event, template) {
//
//        var x, y;
//        x = event.center.x;
//        y = event.center.y;
//
//        _.each(circles, function(circle) {
//            var circle = $("#" + circle._id);
//            var offset = circle.offset();
//
//            var circleCoordinates = {
//                xStart: offset.left,
//                xEnd: offset.left + circle.width(),
//                yStart: offset.top,
//                yEnd: offset.top + circle.height()
//            };
//
//            var xPinch = false;
//            var yPinch = false;
//
//            if (x >= circleCoordinates.xStart && x <= circleCoordinates.xEnd) {
//                xPinch = true;
//            }
//
//            if (y >= circleCoordinates.yStart && y <= circleCoordinates.yEnd) {
//                yPinch = true;
//            }
//
//            if (xPinch && yPinch) {
//
//                var genre = circle[0].innerHTML;
//
//                Router.go("genre", {genre: genre});
//            }
//        });
//    }
//});