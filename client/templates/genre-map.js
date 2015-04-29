var x;
var y;
var dragging = false;
var mode = "select";

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

    if (mode !== "erase") {
        if (mode === "select") {
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
    lower.canvas.height = window.innerHeight - 30;
    upper.canvas.width  = window.innerWidth;
    upper.canvas.height = window.innerHeight - 30;

});

Template.genreMap.events({
    "click #select": function() {
        mode = "select";
    },
    "click #ban": function() {
        mode = "ban";
    },
    "click #erase": function() {
        mode = "erase";
    },
    "mousedown #upper, touchstart #upper": function(e) {

        if (typeof e.originalEvent.touches === "undefined") {
            x = [e.originalEvent.layerX];
            y = [e.originalEvent.layerY];
        } else {
            var touch = e.originalEvent.touches[0];
            x = [touch.pageX];
            y = [touch.pageY];
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
                y.push(touch.pageY);
            }

            upper.clearRect(0,0,upper.canvas.width,upper.canvas.height) ;
            drawStroke(upper);
        }
    },
    "mouseup #upper, touchend #upper": function() {
        dragging = false;
        upper.clearRect(0,0,upper.canvas.width,upper.canvas.height) ;
        drawStroke(lower);

        var circles = ["circle1", "circle2", "circle3", "circle4", "circle5", "circle6"];
        var paintedCircles = [];

        _.each(circles, function(circleId) {
            var circle = $("#" + circleId);
            var offset = circle.offset();

            var circleCoordinates = {
                xStart: offset.left,
                xEnd: offset.left + circle.width(),
                yStart: offset.top,
                yEnd: offset.top + circle.height()
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
                paintedCircles.push(circleId);
                circle.css({backgroundColor: "red"});
            }
        });

    }
});

Template.genreMap.gestures({
    'pinchout #upper': function (event, template) {

        var x, y;
        x = event.center.x;
        y = event.center.y;


        var circles = ["circle1", "circle2", "circle3", "circle4", "circle5", "circle6"];

        _.each(circles, function(circleId) {
            var circle = $("#" + circleId);
            var offset = circle.offset();

            var circleCoordinates = {
                xStart: offset.left,
                xEnd: offset.left + circle.width(),
                yStart: offset.top,
                yEnd: offset.top + circle.height()
            };

            var xPinch = false;
            var yPinch = false;

            if (x >= circleCoordinates.xStart && x <= circleCoordinates.xEnd) {
                xPinch = true;
            }

            if (y >= circleCoordinates.yStart && y <= circleCoordinates.yEnd) {
                yPinch = true;
            }

            if (xPinch && yPinch) {

                var genre = circle[0].innerHTML;

                Router.go("genre", {genre: genre});
            }
        });
    }
});