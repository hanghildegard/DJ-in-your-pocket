Router.configure({
    layoutTemplate: 'layout'
});

Router.route("/", {
    template: "playlists"
});

Router.route("/new-playlist", {
    template: "newPlaylist"
});

Router.route("/filters", {
    template: "filtersMenu"
});

Router.route("/genres", {
    template: "genreMap",
    name: "genres",
    data: function() {
        return Genres.find({type: "parent"});
    }
});

Router.route("/moods", {
    template: "moods",
    name: "moods"
});

Router.route("/debug", {
    template: "debug",
    name: "debug"
});

Router.route("/timeline", {
    template: "timeline",
    name: "timeline"
});

Router.route("/genre/:genre", {
    template: "genre",
    name: "genre",
    data: function(){
        return {genre: this.params.genre};
    }
});

Router.route("/playlist/:id", {
    template: "playlist",
    name: "playlist",
    data: function(){
        return {playlist: Session.get("currentPlaylist")};
    }
});

Router.route("/song/:id", {
    template: "song",
    name: "song",
    data: function(){

        console.log(Session.get("currentPlaylist"));
        _.findWhere(Session.get("currentPlaylist"), function(song) {

        });
        return {song: Session.get("currentSong")};
    }
});