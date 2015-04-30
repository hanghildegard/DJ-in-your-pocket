Tracker.autorun(function() {
    if (Session.get("song")) {

        //Meteor.call("getSong", Session.get("song").id, function(err, result) {
        //    console.log(err);
        //    console.log(result);
        //});

    }
});
//
//if (Meteor.isCordova) {
//
//    function getMediaUrl(sound) {
//
//        if (device.platform.toLowerCase() === "android") {
//
//            return cordova.file.applicationDirectory.replace('file://', '') + 'www/application/' + sound.substr(1);
//
//        }
//        else {
//
//            return cordova.file.applicationDirectory.replace('file://', '') + sound.substr(1);
//
//        }
//
//    }
//
//    var media = new Audio(getMediaUrl("/song.mp3"),
//
//        function (success) {
//            // success
//        },
//        function (err) {
//            console.log(err);
//        });
//}

Template.song.onRendered(function() {
    var songId = Router.current().params.id;
    var song = _.findWhere(Session.get("songs"), {id: parseInt(songId)});

    Session.set("song", song);
});

Template.song.helpers({
    song: function() {
        return Session.get("song");
    },
    playing: function() {
        return Session.get("playing");
    }
});

Template.song.events({
    "click #play": function() {
        media.play();
        Session.set("playing", true);
    },
    "click #pause": function() {
        media.pause();
        Session.set("playing", false);
    }
});