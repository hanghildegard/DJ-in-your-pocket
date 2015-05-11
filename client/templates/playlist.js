Session.setDefault("songs", []);

Template.playlist.onRendered(function() {
    var playlistId = Router.current().params.id;
    var playList = _.findWhere(Session.get("playlists"), {id: playlistId});
    Session.set("currentPlaylist", playList);

    Meteor.call('getPlaylistSongs', playlistId,function(error, result){
        if(error){
            console.log("error",error);
        }

        Session.set("songs", result.data.data);
    });
});

Template.playlist.helpers({
    songs: function() {
        return Session.get("songs");
    }
});