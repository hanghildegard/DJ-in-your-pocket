var x;
var y;
var dragging = false;

var onShakeGenres = _.debounce(function onShake() {
    var playlist = Session.get("currentPlaylist");
    playlist.selectedGenres = [];
    playlist.bannedGenres = [];

    Session.set("currentPlaylist", playlist);

    Meteor.call("updatePlaylist", playlist, function () {

    });
}, 750, true);

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

    shake.startWatch(function () {
        lower.clearRect(0, 0, window.innerWidth, window.innerHeight - 80);
        onShakeGenres();
    }, 30);

    lower.canvas.width  = window.innerWidth;
    lower.canvas.height = window.innerHeight - 80;
    upper.canvas.width  = window.innerWidth;
    upper.canvas.height = window.innerHeight - 80;

});

Template.genreMap.onDestroyed(function() {
    shake.stopWatch();
});

Template.genreMap.helpers({
    circles: function() {
        return Genres.find({type: "primary"});
    },
    brushIs: function(brush) {
        return Session.get("brush") === brush;
    },
    status: function(metaId) {
        if (Session.get("currentPlaylist").selectedGenres.indexOf(metaId) > -1)
            return 'selected';
        else if (Session.get("currentPlaylist").bannedGenres.indexOf(metaId) > -1)
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

        var selectedCircles = Session.get("currentPlaylist").selectedGenres;
        var bannedCircles = Session.get("currentPlaylist").bannedGenres;

        _.each(circles, function(genre) {
            var circle = $("#" + genre.metaId);
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
                if (Session.get("brush") === "select") {
                    if (selectedCircles.indexOf(genre.metaId) < 0) {
                        selectedCircles.push(genre.metaId);
                    }

                    if (bannedCircles.indexOf(genre.metaId) > -1) {
                        bannedCircles.splice(bannedCircles.indexOf(genre.metaId), 1);
                    }
                } else if (Session.get("brush") === "ban") {
                    if (bannedCircles.indexOf(genre.metaId) < 0) {
                        bannedCircles.push(genre.metaId);
                    }

                    if (selectedCircles.indexOf(genre.metaId) > -1) {
                        selectedCircles.splice(selectedCircles.indexOf(genre.metaId), 1);
                    }
                }
            }
        });

        var playlist = Session.get("currentPlaylist");
        playlist.selectedGenres = selectedCircles;
        playlist.bannedGenres = bannedCircles;

        Session.set("currentPlaylist", playlist);

        Meteor.call("updatePlaylist", Session.get("currentPlaylist"), function() {

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
//            var circle = $("#" + circle.metaId);
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