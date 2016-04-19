/*****************************************************************************/
/* AccountWithoutPwd: Event Handlers */
/*****************************************************************************/
Template.AccountWithoutPwd.events({
  'submit #account-without-pwd-form': function(event, template) {
    event.preventDefault();
    var obj = event.target;
    var email = obj.nusEmail.value;

    Meteor.call('signup/addEmail', email, function(err) {
      if (err) {
        Bert.alert('Error changing email: ' + err, 'danger', 'growl-top-right');
      } else {
        Meteor.call('signup/sendVerificationEmail');
        Bert.alert('Successfully added your NUS email: ' + email + ".  Please verify your email to continue.", 'success', 'growl-top-right');

        Router.go('main');
      }
    });
  },

  'click #btn-resend-verify-email': function(event, template) {
    Meteor.call('signup/sendVerificationEmail', function(err) {
      if (err) {
        return Bert.alert('Error sending verification email.', 'warning', 'growl-top-right');
      }
      Bert.alert('Successfully sent verification email.', 'success', 'growl-top-right');
    });
  }

});

/*****************************************************************************/
/* AccountWithoutPwd: Helpers */
/*****************************************************************************/
Template.AccountWithoutPwd.helpers({
  userEmail: function() {
    return Meteor.user().emails[0].address;
  },

  isVerified: function() {
    return Meteor.user().emails[0].verified;
  }
});

/*****************************************************************************/
/* AccountWithoutPwd: Lifecycle Hooks */
/*****************************************************************************/
Template.AccountWithoutPwd.onCreated(function() {});

Template.AccountWithoutPwd.onRendered(function() {});

Template.AccountWithoutPwd.onDestroyed(function() {});
