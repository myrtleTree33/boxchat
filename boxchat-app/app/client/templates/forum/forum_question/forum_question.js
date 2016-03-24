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
  userName: function() {
    // console.log(Template.instance().data);
  }
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
