/*****************************************************************************/
/* Lander: Event Handlers */
/*****************************************************************************/
Template.Lander.events({
  'click #btn-logout': function(event) {
    Meteor.logout(function(err) {
      if (err) {
        throw new Meteor.error("Logout failed");
      }
    })
  }
});

/*****************************************************************************/
/* Lander: Helpers */
/*****************************************************************************/
Template.Lander.helpers({
});

/*****************************************************************************/
/* Lander: Lifecycle Hooks */
/*****************************************************************************/
Template.Lander.onCreated(function () {
});

Template.Lander.onRendered(function () {
  $('.ui.dropdown').dropdown();
});

Template.Lander.onDestroyed(function () {
});
