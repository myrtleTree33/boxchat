/*****************************************************************************/
/* AddEmail: Event Handlers */
/*****************************************************************************/
Template.AddEmail.events({
  'submit #form-add-email': function(event, template) {
    console.log('hihi');
    event.preventDefault();
    var obj = event.target;
    var email = obj.emailAddress.value;
    try {
      Meteor.call('signup/addEmail', email);
      Meteor.call('signup/sendVerificationEmail');
    } catch(e) {
      console.error(e);
    }
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
