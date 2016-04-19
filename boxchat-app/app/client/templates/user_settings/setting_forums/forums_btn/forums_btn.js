/*****************************************************************************/
/* ForumsBtn: Event Handlers */
/*****************************************************************************/
Template.ForumsBtn.events({
  'click .forums-btn .remove': function(event) {
    event.preventDefault();
    var forum = Template.instance().data;
    var forumId = forum._id;
    if (forum.title === Meteor.settings.public['default_public_forum_name']) {
      return Bert.alert('Cannot remove Improvements forum', 'danger', 'growl-top-right');
    } else {
      Meteor.call('userPermissions/removeForum', [Meteor.userId()], ['all'], forumId);
      Forums.update({
        _id: forumId
      }, {
        $pull: {
          all: Meteor.userId(),
          admin: Meteor.userId()
        }
      });
      Bert.alert('Successfully removed forum: ' + forum.title, 'success', 'growl-top-right');
    }
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
