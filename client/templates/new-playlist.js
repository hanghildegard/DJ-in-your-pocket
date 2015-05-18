Template.newPlaylist.helpers({
    newPlaylist: function() {
        return {
            name: ''
        }
    }
});

AutoForm.hooks({
    newPlaylist: {
        onSubmit: function(insertDoc) {
            Session.set("currentPlaylistName", insertDoc.name);
            Meteor.call("newPlaylist", insertDoc, function(err, result) {
                if (err) {
                    console.error(err);
                } else {
                    console.log("success");
                    Session.set("currentPlaylist", {id: result.data.data.plid, name: Session.get("currentPlaylistName")});
                    GetPlaylistData(result.data.data.plid);
                    Router.go("filters");
                }
            });

            return false;
        }
    }
});