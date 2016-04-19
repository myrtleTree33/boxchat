/*****************************************************************************/
/* ForumHotTopic: Event Handlers */
/*****************************************************************************/
Template.ForumHotTopic.events({
  'click .forum-hot-topic': function(event, template) {
    event.preventDefault();
    var forumId = template.data._id;
    Router.go('question', {
      id: forumId
    });
  }
});

/*****************************************************************************/
/* ForumHotTopic: Helpers */
/*****************************************************************************/
Template.ForumHotTopic.helpers({
});

/*****************************************************************************/
/* ForumHotTopic: Lifecycle Hooks */
/*****************************************************************************/
Template.ForumHotTopic.onCreated(function () {
});

Template.ForumHotTopic.onRendered(function () {
});

Template.ForumHotTopic.onDestroyed(function () {
});
