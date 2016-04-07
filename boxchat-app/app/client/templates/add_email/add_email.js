/*****************************************************************************/
/* AddEmail: Event Handlers */
/*****************************************************************************/
Template.AddEmail.events({
  'submit #form-add-email': function(event, template) {
    console.log('hihi');
    event.preventDefault();
    var obj = event.target;
    var email = obj.emailAddress.value;
    Meteor.users.update(Meteor.userId(), {
      $push: {
        'profile.emails': {
          $each: [{email: email, verified: false}],
          $position: 0
        }
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
