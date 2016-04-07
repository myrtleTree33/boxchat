/*****************************************************************************/
/* Signup: Event Handlers */
/*****************************************************************************/
Template.Signup.events({
  'submit #signup': function(event, template) {
    event.preventDefault();

    var user = {
      email: template.find('[name="emailAddress"]').value,
      password: template.find('[name="password"]').value,
      name: template.find('[name="name"]').value
    };

    Accounts.createUser(user, function(err) {
      if (err) {
        Bert.alert(err.reason, 'danger');
      } else {
        Meteor.call('signup/sendVerificationEmail');
      }
    });
  }

});

/*****************************************************************************/
/* Signup: Helpers */
/*****************************************************************************/
Template.Signup.helpers({});

/*****************************************************************************/
/* Signup: Lifecycle Hooks */
/*****************************************************************************/
Template.Signup.onCreated(function() {});

Template.Signup.onRendered(function() {});

Template.Signup.onDestroyed(function() {});
