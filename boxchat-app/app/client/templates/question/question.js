/*****************************************************************************/
/* Question: Event Handlers */
/*****************************************************************************/
Template.Question.events({});

/*****************************************************************************/
/* Question: Helpers */
/*****************************************************************************/
Template.Question.helpers({
  question: function() {
    return Template.instance().data;
  },
  interactions: function() {
    var questionId = Router.current().params.id;
    return Interactions.find({
      questionId: questionId
    }, {
      sort: {
        createdAt: -1
      }
    });
  },
  interactionsCount: function() {
    var questionId = Router.current().params.id;
    return Interactions.find({
      questionId: questionId
    }).count();
  }
});

/*****************************************************************************/
/* Question: Lifecycle Hooks */
/*****************************************************************************/
Template.Question.onCreated(function() {});

Template.Question.onRendered(function() {});

Template.Question.onDestroyed(function() {});
