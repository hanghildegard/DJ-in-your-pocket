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

Template.playlistItem.events({
    "contextmenu": function(event, template) {

        console.log(template.data);
        IonActionSheet.show({
            titleText: template.data.name,
            buttons: [
                { text: 'Edit' }
            ],
            destructiveText: 'Delete',
            cancelText: 'Cancel',
            cancel: function() {

            },
            buttonClicked: function(index) {
                if (index === 0) {
                    var playlists = Session.get("playlists");
                    var selected= _.findWhere(playlists, {id: template.data.id});
                    Session.set("currentPlaylist", selected);
                    Router.go("filters");
                }
                return true;
            },
            destructiveButtonClicked: function() {
                var playlists = Session.get("playlists");
                playlists.splice(playlists.indexOf(_.findWhere(playlists, {id: template.data.id})), 1);
                Session.set("playlists", playlists);
                Meteor.call("deletePlaylist", template.data.id);
                return true;
            }
        });
    }
});

Template.newPlaylistButton.events({
    "click": function() {
        Router.go("new-playlist");
    }
});

//test