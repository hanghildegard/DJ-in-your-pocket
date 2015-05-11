var x;
var y;
var dragging = false;

Session.setDefault("brush", "select");

var periods = [
    "2015",
    "2010",
    "2000",
    "1990",
    "1980",
    "1970",
    "1960",
    "1950",
    "1940",
    "1930",
    "1920",
    "1910"
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

Template.periods.onRendered(function() {

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

Template.periods.helpers({
    periods: function() {
        return periods;
    },
    isShort: function(period) {
        return (period === "1910" || period === "1920" || period === "1930" || period === "1940");
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

Template.periods.events({
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

        console.log(periods);

        _.each(periods, function(period) {
            var period = $("#" + period);
            var offset = period.offset();
            var periodCoordinates = {
                xStart: offset.left,
                xEnd: offset.left + period.width(),
                yStart: offset.top - 60,
                yEnd: offset.top - 60 + period.height()
            };

            var xPaintedOver = false;
            var yPaintedOver = false;

            _.each(x, function(value) {
                if (value >= periodCoordinates.xStart && value <= periodCoordinates.xEnd) {
                    xPaintedOver = true;
                }
            });

            _.each(y, function(value) {
                if (value >= periodCoordinates.yStart && value <= periodCoordinates.yEnd) {
                    yPaintedOver = true;
                }
            });

            var paintedOver = false;

            if (xPaintedOver && yPaintedOver) {
                paintedCircles.push(period);
                if (Session.get("brush") === "select") {
                    period.css({backgroundColor: "#80cbc4"});
                } else if (Session.get("brush") === "ban") {
                    period.css({backgroundColor: "#ef9a9a"});
                }
            }
        });

    }
});

//Template.periods.gestures({
//    'pinchout #upper': function (event, template) {
//
//        var x, y;
//        x = event.center.x;
//        y = event.center.y;
//
//        _.each(periods, function(period) {
//            var period = $("#" + period);
//            var offset = period.offset();
//
//            var periodCoordinates = {
//                xStart: offset.left,
//                xEnd: offset.left + period.width(),
//                yStart: offset.top,
//                yEnd: offset.top + period.height()
//            };
//
//            var xPinch = false;
//            var yPinch = false;
//
//            if (x >= periodCoordinates.xStart && x <= periodCoordinates.xEnd) {
//                xPinch = true;
//            }
//
//            if (y >= periodCoordinates.yStart && y <= periodCoordinates.yEnd) {
//                yPinch = true;
//            }
//
//            if (xPinch && yPinch) {
//
//                var genre = period[0].innerHTML;
//
//                Router.go("genre", {genre: genre});
//            }
//        });
//    }
//});