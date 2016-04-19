/*****************************************************************************/
/* ForumbarItemCreate: Event Handlers */
/*****************************************************************************/
Template.ForumbarItemCreate.events({
  'click .forumbar-create': function(event, template) {
    // Close the forum bar on click
    $('.forumbar.sidebar')
      .sidebar('setting', 'transition', 'push')
      .sidebar('toggle');
    Router.go('forumCreate');
  }
});

/*****************************************************************************/
/* ForumbarItemCreate: Helpers */
/*****************************************************************************/
Template.ForumbarItemCreate.helpers({
});

/*****************************************************************************/
/* ForumbarItemCreate: Lifecycle Hooks */
/*****************************************************************************/
Template.ForumbarItemCreate.onCreated(function () {
});

Template.ForumbarItemCreate.onRendered(function () {
});

Template.ForumbarItemCreate.onDestroyed(function () {
});
