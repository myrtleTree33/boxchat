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

    Meteor.call('signup/createNewPasswordUser', user.email, user.password, user.name, function(err) {
      if (err) {
        Bert.alert(err.reason, 'warning', 'growl-top-right');
      } else {
        var _user = {
          email: user.email,
          password: user.password,
          username: user.name
        };
        Accounts.createUser(_user, function(err) {
          if (err) {
            Bert.alert(err.reason, 'warning', 'growl-top-right');
          } else {
            Bert.alert('You are signed in!', 'success', 'growl-top-right');
            Meteor.call('signup/sendVerificationEmail');
            setTimeout(function() {
              Router.go('main', {});
            }, 200);
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
