/*****************************************************************************/
/* Topbar: Event Handlers */
/*****************************************************************************/
Template.Topbar.events({
  'click #btn-logout': function(event) {
    Meteor.logout(function(err) {
      if (err) {
        throw new Meteor.error("Logout failed");
      }
    })
  }
});

/*****************************************************************************/
/* Topbar: Helpers */
/*****************************************************************************/
Template.Topbar.helpers({
});

/*****************************************************************************/
/* Topbar: Lifecycle Hooks */
/*****************************************************************************/
Template.Topbar.onCreated(function () {
});

Template.Topbar.onRendered(function () {
  $('.ui.dropdown').dropdown();
});

Template.Topbar.onDestroyed(function () {
});
