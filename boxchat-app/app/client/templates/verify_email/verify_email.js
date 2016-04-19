/*****************************************************************************/
/* VerifyEmail: Event Handlers */
/*****************************************************************************/
Template.VerifyEmail.events({
});

/*****************************************************************************/
/* VerifyEmail: Helpers */
/*****************************************************************************/
Template.VerifyEmail.helpers({
});

/*****************************************************************************/
/* VerifyEmail: Lifecycle Hooks */
/*****************************************************************************/
Template.VerifyEmail.onCreated(function () {
    Accounts.verifyEmail(Template.instance().data.token, function(err) {
      if (err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right');
      } else {
        // on first created, and successfully validated, then add user to existing forums if needed
        Meteor.call('signup/addPendingForums', Meteor.userId());
        Bert.alert('Email verified!', 'success', 'growl-top-right');
      }
      Router.go('/');
    });
});

Template.VerifyEmail.onRendered(function () {
});

Template.VerifyEmail.onDestroyed(function () {
});
