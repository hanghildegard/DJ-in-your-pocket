Template.layout.onRendered(function() {

});

Template.layout.helpers({
    viewIs: function(view) {
        return Iron.Location.get().path.substring(1) === view;
    }
});