Router.configure({
    layoutTemplate: 'layout'
});

Router.route("/", {
    template: "playlists"
});

Router.route("/genres", {
    template: "genreMap",
    name: "genreMap",
    data: function() {
        return Genres.find({type: "parent"});
    }
});

Router.route("/moods", {
    template: "moods",
    name: "moods"
});

Router.route("/periods", {
    template: "periods",
    name: "periods"
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