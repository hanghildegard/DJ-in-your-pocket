Meteor.startup(function () {

    var url = "https://www.djonline.fi/demola.php";
    var uid = 891;
    var pw = CryptoJS.SHA1("2Rn4213Xp7fl").toString();

    function getPlaylists(uid, pw, callback) {
        HTTP.post(url,{params: {uid: uid, pw:pw, method: "getPlaylists"}}, function(err, result) {
            console.log(result);
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

    function getSong(uid, pw, trackId, callback) {
        var url = "https://www.djonline.fi/demola_download.php";
        HTTP.post(url,{params: {userid: uid, password:pw, trackid: trackId}}, function(err, result) {
            return callback(err, result);
        });
    }

    var wrappedGetSong = Meteor.wrapAsync(getSong);

    Meteor.methods({
        getPlaylists: function(){
            return wrappedGetPlaylists(uid, pw);
        },
        getPlaylistSongs: function(playlistId){
            return wrappedGetPlaylistSongs(uid, pw, playlistId);
        },
        getSong: function(songId) {
            return wrappedGetSong(uid, pw, songId);
        }
    })
});