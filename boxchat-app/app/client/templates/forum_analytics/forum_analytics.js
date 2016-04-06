/*****************************************************************************/
/* ForumAnalytics: Event Handlers */
/*****************************************************************************/
Template.ForumAnalytics.events({
});

/*****************************************************************************/
/* ForumAnalytics: Helpers */
/*****************************************************************************/
Template.ForumAnalytics.helpers({
});

/*****************************************************************************/
/* ForumAnalytics: Lifecycle Hooks */
/*****************************************************************************/
Template.ForumAnalytics.onCreated(function () {
});

Template.ForumAnalytics.onRendered(function () {
  $('.ui.dropdown').dropdown();
  Meteor.call('topMenu/toggleMenuItem', '#btn-analytics');
});

Template.ForumAnalytics.onDestroyed(function () {
});
