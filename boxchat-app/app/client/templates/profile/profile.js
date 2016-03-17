/*****************************************************************************/
/* Profile: Event Handlers */
/*****************************************************************************/
Template.Profile.events({
  'click #btn-create-forum': function(event, template) {
    Router.go('forumCreate');
  }
});

/*****************************************************************************/
/* Profile: Helpers */
/*****************************************************************************/
Template.Profile.helpers({
});

/*****************************************************************************/
/* Profile: Lifecycle Hooks */
/*****************************************************************************/
Template.Profile.onCreated(function () {
});

Template.Profile.onRendered(function () {
});

Template.Profile.onDestroyed(function () {
});
