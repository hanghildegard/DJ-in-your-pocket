Meteor.startup(function () {
    //var manager = $('body').data('hammer');
    //var twoFingerSwipe = new Hammer.Swipe({
    //    event: '2fingerswipe', /* prefix for custom swipe events, e.g. 2fingerswipeleft, 2fingerswiperight */
    //    pointers: 2,
    //    velocity: 0.5
    //});
    //manager.add(twoFingerSwipe);
    //
    //manager.get('pinch').set({ enable: true });
    var authToken;
    Meteor.call("getAuthToken", function(error, result) {
        if (!error) {
            authToken = result;
            Session.set("token", authToken);
            console.log(result);
        } else {
            console.log(error);
        }
    });
});