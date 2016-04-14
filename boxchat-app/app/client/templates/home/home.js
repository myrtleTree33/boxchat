/*****************************************************************************/
/* Home: Event Handlers */
/*****************************************************************************/
Template.Home.events({
  'click .btn-splash-login': function(event, template) {
    Router.go('login');
  }
});

/*****************************************************************************/
/* Home: Helpers */
/*****************************************************************************/
Template.Home.helpers({});

/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.Home.onCreated(function() {});

Template.Home.onRendered(function() {
  if (Meteor.userId()) {
    var forumId = Forums.findOne({
      title: Meteor.settings.public['default_public_forum_name']
    })._id;
    Router.go('forum', {
      id: forumId
    });
  }
});

Template.Home.onDestroyed(function() {});
