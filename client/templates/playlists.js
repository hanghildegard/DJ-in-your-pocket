Session.setDefault("playlists",[]);

Template.playlists.helpers({
    playlists: function() {
        Meteor.call('getPlaylists', function(error, result){
            if(error){
                console.log("error",error);
            };
            console.log(result.data.data);
            Session.set("playlists",result.data.data);
        });

        var playlists = Session.get("playlists");
        return playlists;

        //Meteor.call('getPlaylists',Session.get("uid"),Session.get("hash"),function(error, result){
        //    if(error){
        //        console.log("error",error);
        //    };
        //
        //    return result.data.data;
        //});
    }
});

Template.playlists.events({
    "click #newPlaylist": function() {
        Router.go("new-playlist");
    }
});

Template.newPlaylistButton.events({
    "click": function() {
        Router.go("new-playlist");
    }
});

//test