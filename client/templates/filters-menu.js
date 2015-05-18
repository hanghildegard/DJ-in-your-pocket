Template.filtersMenu.helpers({
    playlist: function () {
        return Session.get("currentPlaylist");
    }
});

Template.filtersMenu.events({
    "click .menu-item": function(event) {
        Router.go($(event.currentTarget).attr('id'));
    }
});

Template.doneButton.events({
    "click": function(event) {
        console.log("done");
        Router.go("playlist", {id: Session.get("currentPlaylist").id});
    }
});