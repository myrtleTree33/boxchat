/*****************************************************************************/
/* LapiAuth: Event Handlers */
/*****************************************************************************/
Template.LapiAuth.events({});

/*****************************************************************************/
/* LapiAuth: Helpers */
/*****************************************************************************/
Template.LapiAuth.helpers({});

/*****************************************************************************/
/* LapiAuth: Lifecycle Hooks */
/*****************************************************************************/
Template.LapiAuth.onCreated(function() {
  var query = Template.instance().data;
  console.log(query);
  if (query.token) {
    Meteor.call('lapi/addAuthToken', query.token, function(err) {
      if (err) {
        return Bert.alert('Issue linking with NUS IVLE: Cannot update database.', 'danger', 'growl-top-right');
      }
      Bert.alert('Successfully linked with NUS IVLE.', 'success', 'growl-top-right');
    });
  } else {
    Bert.alert('Issue linking with NUS IVLE.', 'danger', 'growl-top-right');
  }
  // go back to user settings
  Router.go('userSettings', {});
});

Template.LapiAuth.onRendered(function() {});

Template.LapiAuth.onDestroyed(function() {});
