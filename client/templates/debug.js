Template.debug.helpers({
    data: function () {
        GetPlaylistData(Session.get("currentPlaylist").id);
        return JSON.stringify(Session.get("currentPlaylist"), null, 4);
    }
});