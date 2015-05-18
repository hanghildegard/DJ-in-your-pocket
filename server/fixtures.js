Meteor.startup(function() {
    if (Genres.find().count() === 0) {
        var genres = [
            {
                "id": "1001",
                "name": "Pop"
            },
            {
                "id": "1002",
                "name": "Rock"
            },
            {
                "id": "1003",
                "name": "Metal"
            },
            {
                "id": "1004",
                "name": "Blues"
            },
            {
                "id": "1007",
                "name": "Dance"
            },
            {
                "id": "1008",
                "name": "Street & Urban"
            },
            {
                "id": "1009",
                "name": "World Music"
            },
            {
                "id": "1010",
                "name": "Xtreme"
            },
            {
                "id": "1005",
                "name": "Latin"
            },
            {
                "id": "1006",
                "name": "Jamaica"
            },
            {
                "id": "1011",
                "name": "Background"
            }
        ];

        _.each(genres, function(genre) {
            Genres.insert({name: genre.name, metaId: genre.id, type: "primary"});
        });
    }
});