GetPlaylistData = function(playlistId) {
    Meteor.call("getPlaylistData", playlistId, function (error, result) {
        if(error){
            console.log("error",error);
        }

        console.log("got data", result);

        var playlist = result.data.data[0];
        playlist.id = playlistId;

        playlist.selectedGenres = [];
        playlist.bannedGenres = [];

        playlist.selectedMoods = [];
        playlist.bannedMoods = [];

        _.each(playlist.rules, function(rule) {
            switch(rule.type) {
                case "1":
                    if (rule.op === "1") {
                        playlist.selectedGenres.push(rule.id);
                    } else {
                        playlist.bannedGenres.push(rule.id);
                    }
                    break;
                case "2":
                    if (rule.op === "1") {
                        playlist.selectedMoods.push(rule.id);
                    } else {
                        playlist.bannedMoods.push(rule.id);
                    }
                    break;
            }
        });

        Session.set("currentPlaylist", playlist);

        console.log(playlist);
    });
}