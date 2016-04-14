/*****************************************************************************/
/* ForumsBtn: Event Handlers */
/*****************************************************************************/
Template.ForumsBtn.events({
  'click .forums-btn .remove': function(event) {
    event.preventDefault();
    var forumId = Template.instance().data._id;
    Forums.update({
      _id: forumId
    }, {
      $pull: {
        all: Meteor.userId(),
        admin: Meteor.userId()
      }
    });

    Meteor.call('userPermissions/removeForum', Meteor.userId(), ['all'], forumId);
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
