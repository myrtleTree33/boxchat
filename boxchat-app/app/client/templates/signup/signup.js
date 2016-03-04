/*****************************************************************************/
/* Signup: Event Handlers */
/*****************************************************************************/
Template.Signup.events({
  'submit #signup': function(event, template) {
    event.preventDefault();

    console.log('clicked');

    var user = {
      email: template.find('[name="emailAddress"]').value,
      password: template.find('[name="password"]').value
    };

    console.log(user);

    Accounts.createUser(user, function(err) {
      if (err) {
        Bert.alert(err.reason, 'danger');
      } else {
        Meteor.call('signup/sendVerificationEmail', function(err, res) {
          if (err) {
            Bert.alert(err.reason, 'danger');
          } else {
            Bert.alert('Welcome!', 'success');
          }
        });
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
