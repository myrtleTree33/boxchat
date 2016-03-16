/*****************************************************************************/
/* Sidebar: Event Handlers */
/*****************************************************************************/
Template.Sidebar.events({
  'click #btn-logout': function(event) {
    Meteor.logout(function(err) {
      if (err) {
        throw new Meteor.error("Logout failed");
      }
    })
  },

  'click #btn-home': function(event) {
    Router.go('/');
  },

  'click #btn-profile': function(event) {
    Router.go('/profile');
  }
});

/*****************************************************************************/
/* Sidebar: Helpers */
/*****************************************************************************/
Template.Sidebar.helpers({});

/*****************************************************************************/
/* Sidebar: Lifecycle Hooks */
/*****************************************************************************/
Template.Sidebar.onCreated(function() {});

Template.Sidebar.onRendered(function() {});

Template.Sidebar.onDestroyed(function() {});
