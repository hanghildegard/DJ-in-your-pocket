Meteor.startup(function() {
    if (Genres.find().count() === 0) {
        var genres = [
            {
                name: "Pop",
                subGenres: [
                    "Ballad",
                    "Pop rock",
                    "Electropop",
                    "80s pop"
                ]
            },
            {
                name: "Rock",
                subGenres: [
                    "Acid rock",
                    "Indie rock",
                    "Pop rock",
                    "Punk rock"
                ]
            },
            {
                name: "Jazz",
                subGenres: [
                    "Smooth jazz",
                    "Acid jazz",
                    "Gypsy jazz",
                    "Bebop",
                    "Big band"
                ]
            },
            {
                name: "Classical",
                subGenres: [
                    "Baroque",
                    "Avant-Garde",
                    "Opera",
                    "Renaissance",
                    "Romantic"

                ]
            },
            {
                name: "Metal",
                subGenres: [
                    "Heavy metal",
                    "Death metal",
                    "Black metal",
                    "Alternative metal",
                    "Doom metal"
                ]
            }
        ];

        _.each(genres, function(genre) {
            var id = Genres.insert({name: genre.name, type: "primary"});

            _.each(genre.subGenres, function(subGenre) {
                Genres.insert({name: subGenre, type: "secondary", parent: id});
            });
        });
    }

    if (Playlists.find().count() === 0) {

        var jazzGenres = [];

        jazzGenres.push(Genres.findOne({name: "Smooth jazz"})._id);
        jazzGenres.push(Genres.findOne({name: "Big band"})._id);
        jazzGenres.push(Genres.findOne({name: "Gypsy jazz"})._id);

        var partyGenres = [];

        partyGenres.push(Genres.findOne({name: "Rock"})._id);
        partyGenres.push(Genres.findOne({name: "80s pop"})._id);
        partyGenres.push(Genres.findOne({name: "Electropop"})._id);

        var restaurantGenres = [];

        restaurantGenres.push(Genres.findOne({name: "Smooth jazz"})._id);
        restaurantGenres.push(Genres.findOne({name: "Big band"})._id);
        restaurantGenres.push(Genres.findOne({name: "Acid jazz"})._id);
        restaurantGenres.push(Genres.findOne({name: "Classical"})._id);


        var playlists = [
            {
                name: "Autumn jazz",
                genres: jazzGenres,
                songs: []
            },
            {
                name: "Party music",
                genres: partyGenres,
                songs: []
            },
            {
                name: "Restaurant evening",
                genres: restaurantGenres,
                songs: []
            }
        ];

        _.each(playlists, function(playlist) {
            Playlists.insert(playlist);
        });
    }
});