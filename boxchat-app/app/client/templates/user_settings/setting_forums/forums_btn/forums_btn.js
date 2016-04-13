/*****************************************************************************/
/* ForumsBtn: Event Handlers */
/*****************************************************************************/
Template.ForumsBtn.events({
    'click .forums-btn .remove': function(event) {
        event.preventDefault();
        Forums.update({_id:Template.instance().data._id}, 
                      {$pull: {all: Meteor.userId(), admin: Meteor.userId()}}
        );
    }
});

/*****************************************************************************/
/* ForumsBtn: Helpers */
/*****************************************************************************/
Template.ForumsBtn.helpers({});

/*****************************************************************************/
/* ForumsBtn: Lifecycle Hooks */
/*****************************************************************************/
Template.ForumsBtn.onCreated(function() {});

Template.ForumsBtn.onRendered(function() {

});

Template.ForumsBtn.onDestroyed(function() {});
