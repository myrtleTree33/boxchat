/*****************************************************************************/
/* QuestionMainFooter: Event Handlers */
/*****************************************************************************/
Template.QuestionMainFooter.events({
});

/*****************************************************************************/
/* QuestionMainFooter: Helpers */
/*****************************************************************************/
Template.QuestionMainFooter.helpers({
      creationTime: function() {
    return moment(Template.instance().data.question.createdAt).fromNow();
  }
});

/*****************************************************************************/
/* QuestionMainFooter: Lifecycle Hooks */
/*****************************************************************************/
Template.QuestionMainFooter.onCreated(function () {
});

Template.QuestionMainFooter.onRendered(function () {
});

Template.QuestionMainFooter.onDestroyed(function () {
});
