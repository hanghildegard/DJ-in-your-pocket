var media = new ReactiveVar();

if (Meteor.isCordova) {
    var httpd = null;
    var httpUrl = null;

    //function startServer(wwwroot) {
    //    console.log('starting server at ' + wwwroot);
    //    if (httpd) {
    //        // before start, check whether its up or not
    //        httpd.getURL(function (url) {
    //            if (url.length > 0) {
    //                httpUrl = url;
    //                console.log("server is up: <a href='" + url + "' target='_blank'>" + url + "</a>");
    //                // httpd.getLocalPath(function(path) {
    //                //   console.log("localPath: " + path);
    //                // });
    //            } else {
    //                /* wwwroot is the root dir of web server, it can be absolute or relative path
    //                 * if a relative path is given, it will be relative to cordova assets/www/ in APK.
    //                 * "", by default, it will point to cordova assets/www/, it's good to use 'htdocs' for 'www/htdocs'
    //                 * if a absolute path is given, it will access file system.
    //                 * "/", set the root dir as the www root, it maybe a security issue, but very powerful to browse all dir
    //                 */
    //                httpd.startServer({
    //                    'www_root': wwwroot,
    //                    'port': 8080,
    //                    'localhost_only': true
    //                }, function (url) {
    //                    httpUrl = url;
    //                    // if server is up, it will return the url of http://<server ip>:port/
    //                    // the ip is the active network connection
    //                    // if no wifi or no cell, "127.0.0.1" will be returned.
    //                    console.log("server is started: <a href='" + url + "' target='_blank'>" + url + "</a>");
    //                    // httpd.getLocalPath(function(path) {
    //                    //   console.log("localPath: " + path);
    //                    // });
    //
    //                }, function (error) {
    //                    console.log('failed to start server: ' + error);
    //                });
    //            }
    //
    //        });
    //    } else {
    //        alert('CorHttpd plugin not available/ready.');
    //    }
    //}
    //
    //Meteor.startup(function () {
    //    httpd = (cordova && cordova.plugins && cordova.plugins.CorHttpd) ? cordova.plugins.CorHttpd : null;
    //    if (httpd) {
    //        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
    //            // console.log('fileSystem');
    //            // console.log(fileSystem);
    //            var path = fileSystem.root.nativeURL.replace("file://", "");
    //            // console.log(path);
    //            startServer(path);
    //        });
    //    } else {
    //        console.log("no HTTPD!!!!");
    //    }
    //});
}


Tracker.autorun(function() {
    if (Session.get("song")) {

        var uid = 891;
        var uri = encodeURI("https://www.djonline.fi/demola_download.php?userid=" + uid + "&token=" + Session.get("token") + "&trackid=" + Session.get("song").id);
        var mediaFoo = new Audio(uri,
            function (success) {
                // success
                console.log(success);
            },
            function (err) {
                console.log(err);
            });

        media.set(mediaFoo);

        //var fileTransfer = new FileTransfer();

        //var uid = 891;
        //var uri = encodeURI("https://www.djonline.fi/demola_download.php?userid=" + uid + "&token=" + Session.get("token") + "&trackid=" + Session.get("song").id);
        //var store = cordova.file.cacheDirectory;
        //console.log("cordova.file.dataDirectory");
        //console.log(cordova.file.cacheDirectory);
        //console.log("cordova.file.dataDirectory");

        //fileTransfer.download(
        //    uri,
        //    store + Session.get("song").id + ".ogg",
        //    //fileSystem.root.toURL() + 'foobar.ogg',
        //    function(entry) {
        //        console.log("download complete: " + entry.fullPath);
        //        mediaFoo = new Audio(store + Session.get("song").id + ".ogg",
        //            function (success) {
        //                // success
        //            },
        //            function (err) {
        //                console.log(err);
        //            });
        //
        //        media.set(mediaFoo);
        //    },
        //    function(error) {
        //        _.each(error, function(value, key) {
        //            console.log(key + ": " + value);
        //        });
        //        console.log("latest");
        //        console.log("download error source " + error.source);
        //        console.log("download error target " + error.target);
        //        console.log("upload error code" + error.code);
        //    }
        //);


        //if (!OfflineSongs.findOne({
        //        songId: Session.get("song").id
        //    })) {
        //    var file = Session.get("song");
        //    var uid = 891;
        //    var uri = encodeURI("https://www.djonline.fi/demola_download.php?userid=" + uid + "&token=" + Session.get("token") + "&trackid=" + Session.get("song").id);
        //
        //    //console.log(file);
        //    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
        //        var fileTransfer = new FileTransfer();
        //        //console.log(fileSystem.root);
        //        var path = fileSystem.root.toURL() + file.id + '.ogg';
        //        fileTransfer.download(
        //            uri,
        //            path,
        //            function(entry) {
        //                console.log("Success " + path);
        //                console.log(entry);
        //                OfflineSongs.insert({
        //                    songId: file.id
        //                });
        //
        //            },
        //            function(error) {
        //                console.log("--------------------------------");
        //                _.each(error, function(value, key) {
        //                    console.log(key + ": " + value);
        //                });
        //                console.log("Error during download. Code = " + error.code);
        //                console.log("--------------------------------");
        //            }
        //        );
        //    });
        //
        //} else {
        //    console.log('file already downloaded');
        //}

    }
});
//
//if (Meteor.isCordova) {
//
//    function getMediaUrl(sound) {
//
//        if (device.platform.toLowerCase() === "android") {
//
//            return cordova.file.applicationDirectory.replace('file://', '') + 'www/application/' + sound.substr(1);
//
//        }
//        else {
//
//            return cordova.file.applicationDirectory.replace('file://', '') + sound.substr(1);
//
//        }
//
//    }
//
//    var media = new Audio(getMediaUrl("/song.mp3"),
//
//        function (success) {
//            // success
//        },
//        function (err) {
//            console.log(err);
//        });
//}

Template.song.onRendered(function() {
    var songId = Router.current().params.id;
    var song = _.findWhere(Session.get("songs"), {id: parseInt(songId)});

    Session.set("song", song);
});

Template.song.helpers({
    song: function() {
        return Session.get("song");
    },
    playing: function() {
        return Session.get("playing");
    }
});

Template.song.events({
    "click #play": function() {
        var mediaFoo = media.get();
        mediaFoo.play();

        //_.each(Session.get("song"), function(value, key) {
        //    console.log(key + ": " + value);
        //});
        console.log(mediaFoo.currentTime);

        Session.set("playing", true);
    },
    "click #pause": function() {
        var mediaFoo = media.get();
        mediaFoo.pause();
        Session.set("playing", false);
    },
    "click #next": function() {
        var mediaFoo = media.get();
        mediaFoo.pause();
        var song = Session.get("song");
        var songs = Session.get("songs");

        var index = songs.indexOf(_.findWhere(songs, {id: song.id}));
        if (typeof songs[index + 1] !== 'undefined')
            var nextSong = songs[index + 1];
        else
            var nextSong = songs[0];


        mediaFoo.pause();
        Session.set("playing", false);

        Session.set("song", nextSong);
        var mediaFoo = media.get();

        mediaFoo.play();

        Session.set("playing", true);


    },
    "click #previous": function () {
        var mediaFoo = media.get();
        mediaFoo.pause();
        var song = Session.get("song");
        var songs = Session.get("songs");

        var index = songs.indexOf(_.findWhere(songs, {id: song.id}));
        if (typeof songs[index - 1] !== 'undefined')
            var previousSong = songs[index - 1];
        else
            var previousSong = songs[songs.size-1];

        mediaFoo.pause();
        Session.set("playing", false);

        Session.set("song", previousSong);
        var mediaFoo = media.get();

        mediaFoo.play();

        Session.set("playing", true);
    }
});