Template.playlists.helpers({
    playlists: function() {
        return Playlists.find();
    }
});

Template.playlists.events({
    "click #newPlaylist": function() {
        Router.go("genreMap");
    }
});

//test