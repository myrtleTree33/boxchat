/*****************************************************************************/
/* ForumItems: Event Handlers */
/*****************************************************************************/
Template.ForumItems.events({
    'click #forum': function(event, template) {
        Router.go('forum', {
        id: template.data._id
      });
    }
});

/*****************************************************************************/
/* ForumItems: Helpers */
/*****************************************************************************/
Template.ForumItems.helpers({
});

/*****************************************************************************/
/* ForumItems: Lifecycle Hooks */
/*****************************************************************************/
Template.ForumItems.onCreated(function () {
});

Template.ForumItems.onRendered(function () {
});

Template.ForumItems.onDestroyed(function () {
});
