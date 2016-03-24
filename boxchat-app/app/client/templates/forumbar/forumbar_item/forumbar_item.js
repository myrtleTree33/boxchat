/*****************************************************************************/
/* ForumbarItem: Event Handlers */
/*****************************************************************************/
Template.ForumbarItem.events({
  'click .forumbar.item': function(event, template) {
    // Close the forum bar on click
    /*
    $('.forumbar.sidebar')
      .sidebar('setting', 'transition', 'push')
      .sidebar('toggle');
    */
    Router.go('forum', {
      id: template.data._id
    });
  }
});

/*****************************************************************************/
/* ForumbarItem: Helpers */
/*****************************************************************************/
Template.ForumbarItem.helpers({});

/*****************************************************************************/
/* ForumbarItem: Lifecycle Hooks */
/*****************************************************************************/
Template.ForumbarItem.onCreated(function() {});

Template.ForumbarItem.onRendered(function() {});

Template.ForumbarItem.onDestroyed(function() {});
