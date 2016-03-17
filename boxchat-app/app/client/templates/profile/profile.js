/*****************************************************************************/
/* Profile: Event Handlers */
/*****************************************************************************/
Template.Profile.events({
  'click #btn-create-forum': function(event, template) {
    Router.go('forumCreate');
  }
});

/*****************************************************************************/
/* Profile: Helpers */
/*****************************************************************************/
Template.Profile.helpers({
  forums: function() {
    return Forums.find({
      all: Meteor.user()._id
    }, {
      sort: {
        createdAt: -1
      }
    });
  }
});

/*****************************************************************************/
/* Profile: Lifecycle Hooks */
/*****************************************************************************/
Template.Profile.onCreated(function () {
});

Template.Profile.onRendered(function () {
});

Template.Profile.onDestroyed(function () {
});
