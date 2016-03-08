/*****************************************************************************/
/* Login: Event Handlers */
/*****************************************************************************/
Template.Login.events({
  'click #facebook-login': function(event) {
    Meteor.loginWithFacebook({}, function(err) {
      if (err) {
        throw new Meteor.error("Login failed");
      }
    });
  },

  'click #logut': function(event) {
    Meteor.logout(function(err) {
      if (err) {
        throw new Meteor.error("Logout failed");
      }
    })
  }
});

/*****************************************************************************/
/* Login: Helpers */
/*****************************************************************************/
Template.Login.helpers({});

/*****************************************************************************/
/* Login: Lifecycle Hooks */
/*****************************************************************************/
Template.Login.onCreated(function() {});

Template.Login.onRendered(function() {});

Template.Login.onDestroyed(function() {});
