/*****************************************************************************/
/* ForumQuestionRight: Event Handlers */
/*****************************************************************************/
Template.ForumQuestionRight.events({
});

/*****************************************************************************/
/* ForumQuestionRight: Helpers */
/*****************************************************************************/
Template.ForumQuestionRight.helpers({
  creationTime: function() {
    return moment(Template.instance().data.question.createdAt).fromNow();
  }
});

/*****************************************************************************/
/* ForumQuestionRight: Lifecycle Hooks */
/*****************************************************************************/
Template.ForumQuestionRight.onCreated(function () {
  console.log(Template.instance().data);
});

Template.ForumQuestionRight.onRendered(function () {
});

Template.ForumQuestionRight.onDestroyed(function () {
});
