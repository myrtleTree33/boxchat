/*****************************************************************************/
/* AddEmail: Event Handlers */
/*****************************************************************************/
Template.AddEmail.events({
  'submit #form-add-email': function(event, template) {
    event.preventDefault();
    var obj = event.target;
    var email = obj.emailAddress.value;
    Meteor.call('signup/addEmail', email, function(err) {
      if (err) {
        Bert.alert('Invalid email, please use your NUS email', 'danger', 'growl-top-right');
      } else {
        Meteor.call('signup/sendVerificationEmail', function(err) {
          Bert.alert('Successfully added your NUS email: ' + email, 'success', 'growl-top-right');
        });
      }
    });
  }
});

/*****************************************************************************/
/* AddEmail: Helpers */
/*****************************************************************************/
Template.AddEmail.helpers({});

/*****************************************************************************/
/* AddEmail: Lifecycle Hooks */
/*****************************************************************************/
Template.AddEmail.onCreated(function() {});

Template.AddEmail.onRendered(function() {});

Template.AddEmail.onDestroyed(function() {});
