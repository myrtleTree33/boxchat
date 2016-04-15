/*****************************************************************************/
/* AccountWithPwd: Event Handlers */
/*****************************************************************************/
Template.AccountWithPwd.events({
  'submit #form-update-username': function(event, template) {
    event.preventDefault();
    var obj = event.target;
    var name = obj.name.value.trim();
    Meteor.call('server/userSettings/updateUsername', name, function(err) {
      if (err) {
        return Bert.alert('Error updating name: ' + err, 'warning', 'growl-top-right');

      }
      return Bert.alert('Successfully changed name to ' + name, 'success', 'growl-top-right');
    });
  },

  'submit #form-update-password': function(event, template) {
    event.preventDefault();
    var obj = event.target;
    var oldPassword = obj.oldPassword.value.trim(),
      newPassword = obj.newPassword.value.trim(),
      newPassword2 = obj.newPassword2.value.trim();

    if (newPassword !== newPassword2) {
      return Bert.alert('Error updating password, passwords do not match', 'warning', 'growl-top-right');
    }

    Accounts.changePassword(oldPassword, newPassword, function(err) {
      if (err) {
        return Bert.alert('Error updating password: ' + err, 'warning', 'growl-top-right');
      }
      return Bert.alert('Successfully changed password.', 'success', 'growl-top-right');
    });
  },

  'submit #form-update-email': function(event, template) {
    event.preventDefault();
    var obj = event.target;
    var email = obj.nusEmail.value;

    Meteor.call('signup/addEmail', email, function(err) {
      if (err) {
        Bert.alert('Invalid email, please use your NUS email', 'danger', 'growl-top-right');
      } else {
        Meteor.call('signup/sendVerificationEmail');
        Bert.alert('Successfully added your NUS email: ' + email + ".  Please verify your email to continue.", 'success', 'growl-top-right');
      }
    });
  }

});

/*****************************************************************************/
/* AccountWithPwd: Helpers */
/*****************************************************************************/
Template.AccountWithPwd.helpers({
  userEmail: function() {
    return Meteor.user().emails[0].address;
  }
});

/*****************************************************************************/
/* AccountWithPwd: Lifecycle Hooks */
/*****************************************************************************/
Template.AccountWithPwd.onCreated(function() {});

Template.AccountWithPwd.onRendered(function() {
  console.log(Meteor.user().profile);
});

Template.AccountWithPwd.onDestroyed(function() {});
