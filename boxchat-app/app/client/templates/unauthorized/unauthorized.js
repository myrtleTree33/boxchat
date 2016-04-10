/*****************************************************************************/
/* Unauthorized: Event Handlers */
/*****************************************************************************/
Template.Unauthorized.events({
});

/*****************************************************************************/
/* Unauthorized: Helpers */
/*****************************************************************************/
Template.Unauthorized.helpers({
});

/*****************************************************************************/
/* Unauthorized: Lifecycle Hooks */
/*****************************************************************************/
Template.Unauthorized.onCreated(function () {
});

Template.Unauthorized.onRendered(function () {
  $('.ui.dropdown').dropdown();
  Meteor.call('topMenu/toggleMenuItem', '');
});

Template.Unauthorized.onDestroyed(function () {
});
