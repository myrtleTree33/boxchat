/*****************************************************************************/
/* Forumbar: Event Handlers */
/*****************************************************************************/
Template.Forumbar.events({
});

/*****************************************************************************/
/* Forumbar: Helpers */
/*****************************************************************************/
Template.Forumbar.helpers({
  forums: function() {
    var forums = Forums.find({
      all: Meteor.user()._id
    });
    return forums;
  }
});

/*****************************************************************************/
/* Forumbar: Lifecycle Hooks */
/*****************************************************************************/
Template.Forumbar.onCreated(function () {
});

Template.Forumbar.onRendered(function () {
});

Template.Forumbar.onDestroyed(function () {
});
