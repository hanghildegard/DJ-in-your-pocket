function getAuthToken(callback) {
    var uid = 891;
    var pw = CryptoJS.SHA1("2Rn4213Xp7fl").toString();
    console.log(pw);
    var url = "https://www.djonline.fi/demola.php";

    HTTP.post(url,{params: {uid: uid, pw: pw, method: "login"}}, function(error, result) {
        callback(error, JSON.parse(result.content).data);
    });
}

var wrappedGetAuthToken = Meteor.wrapAsync(getAuthToken);

Meteor.methods({
    getAuthToken: function(callback) {
        if (Meteor.isServer) {
            return wrappedGetAuthToken();
        }
    }
});