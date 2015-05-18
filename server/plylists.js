Meteor.startup(function () {

    var url = "https://www.djonline.fi/demola.php";
    var uid = 891;
    var pw = CryptoJS.SHA1("2Rn4213Xp7fl").toString();

    function getPlaylists(uid, pw, callback) {
        HTTP.post(url,{params: {uid: uid, pw:pw, method: "getPlaylists"}}, function(err, result) {
            return callback(err, result);
        });
    }

    var wrappedGetPlaylists = Meteor.wrapAsync(getPlaylists);


    function getPlaylistSongs(uid, pw, playlistId, callback) {
        HTTP.post(url,{params: {uid: uid,pw:pw, plid: playlistId, method: "getPlaylistSongs"}}, function(error, result) {
            return callback(error, result);
        });
    }

    var wrappedGetPlaylistSongs = Meteor.wrapAsync(getPlaylistSongs);

    function getPlaylistData(uid, pw, playlistId, callback) {
        HTTP.post(url,{params: {uid: uid,pw:pw, plid: playlistId, method: "getPlaylistData"}}, function(error, result) {
            return callback(error, result);
        });
    }

    var wrappedGetPlaylistData = Meteor.wrapAsync(getPlaylistData);

    function getSong(uid, pw, trackId, callback) {
        var url = "https://www.djonline.fi/demola_download.php";
        HTTP.post(url,{params: {userid: uid, password:pw, trackid: trackId}}, function(err, result) {
            return callback(err, result);
        });
    }

    var wrappedGetSong = Meteor.wrapAsync(getSong);

    function postNewPlaylist(name, callback) {
        HTTP.post(url,{params: {
            uid: uid,
            pw:pw,
            method: "savePlaylistData",
            plid: -1,
            name: name,
            fade: 0,
            grouping: 1,
            grouping_base: 2,
            track_limit: 500
        }}, function(err, result) {
            return callback(err, result);
        });
    }

    var wrappedPostNewPlaylist = Meteor.wrapAsync(postNewPlaylist);

    function updatePlaylist(playlist, callback) {

        var params = {
            uid: uid,
            pw:pw,
            method: "savePlaylistData",
            plid: playlist.id,
            name: playlist.name,
            fade: playlist.fade,
            grouping: playlist.grouping,
            grouping_base: playlist.grouping_base,
            track_limit: playlist.track_limit
        };

        var ruleCount = 0;
        _.each(playlist.selectedGenres, function (id) {
            params["rule_" + ruleCount] = "1_" + id + "_1_2_0";
            ruleCount++;
        });
        _.each(playlist.bannedGenres, function (id) {
            params["rule_" + ruleCount] = "1_" + id + "_0_2_0";
            ruleCount++;
        });
        _.each(playlist.selectedMoods, function (id) {
            params["rule_" + ruleCount] = "2_" + id + "_1_2_0";
            ruleCount++;
        });
        _.each(playlist.bannedMoods, function (id) {
            params["rule_" + ruleCount] = "2_" + id + "_0_2_0";
            ruleCount++;
        });

        console.log(params);

        HTTP.post(url,{params: params}, function(err, result) {
            return callback(err, result);
        });
    }

    var wrappedUpdatePlaylist = Meteor.wrapAsync(updatePlaylist);

    Meteor.methods({
        getPlaylists: function(){
            return wrappedGetPlaylists(uid, pw);
        },
        getPlaylistSongs: function(playlistId){
            return wrappedGetPlaylistSongs(uid, pw, playlistId);
        },
        getPlaylistData: function(playlistId){
            return wrappedGetPlaylistData(uid, pw, playlistId);
        },
        getSong: function(songId) {
            return wrappedGetSong(uid, pw, songId);
        },
        newPlaylist: function(data) {
            return wrappedPostNewPlaylist(data.name);
        },
        updatePlaylist: function(playlist) {
            return wrappedUpdatePlaylist(playlist);
        }
    })
});