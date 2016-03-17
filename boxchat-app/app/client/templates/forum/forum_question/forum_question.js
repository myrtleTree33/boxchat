/*****************************************************************************/
/* Question: Event Handlers */
/*****************************************************************************/
Template.ForumQuestion.events({
  'click .forum-question-title': function(event, template) {
    event.preventDefault();
    Router.go('question', {id: template.data._id});
  }
});

/*****************************************************************************/
/* Question: Helpers */
/*****************************************************************************/
Template.ForumQuestion.helpers({
});

/*****************************************************************************/
/* Question: Lifecycle Hooks */
/*****************************************************************************/
Template.ForumQuestion.onCreated(function () {
});

Template.ForumQuestion.onRendered(function () {
});

Template.ForumQuestion.onDestroyed(function () {
});
