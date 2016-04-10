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
Template.Home.onCreated(function() {
  if (Meteor.userId()) {
    Router.go('main');
  }
});

Template.Home.onRendered(function() {
});

Template.Home.onDestroyed(function() {});
