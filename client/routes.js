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

Router.route("/genre/:genre", {
    template: "genre",
    name: "genre",
    data: function(){
        return {genre: this.params.genre};
    }
});