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

  'click #twitter-login': function(event) {
    Meteor.loginWithTwitter({}, function(err) {
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
  },

  'click #btn-sign-up': function(event, template) {
    var curr = template.stateCreateUser.get();
    template.stateCreateUser.set(!curr);
  },

  'submit #form-login-password': function(event, template) {
    event.preventDefault();
    var user = {
      email: template.find('[name="emailAddress"]').value,
      password: template.find('[name="password"]').value
    };
    Meteor.loginWithPassword(user.email, user.password);
  }
});

/*****************************************************************************/
/* Login: Helpers */
/*****************************************************************************/
Template.Login.helpers({
  stateCreateUser: function() {
    return Template.instance().stateCreateUser.get()
  }
});

/*****************************************************************************/
/* Login: Lifecycle Hooks */
/*****************************************************************************/
Template.Login.onCreated(function() {
  this.stateCreateUser = new ReactiveVar(false);
});

Template.Login.onRendered(function() {});

Template.Login.onDestroyed(function() {});
