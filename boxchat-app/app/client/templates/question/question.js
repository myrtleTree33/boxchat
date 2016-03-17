/*****************************************************************************/
/* Question: Event Handlers */
/*****************************************************************************/
Template.Question.events({
  'click .btn-upvote': function(event, template) {
    event.preventDefault();
    var questionId = template.data._id;
    Questions.findOne({_id: questionId}).upvote(Meteor.user()._id);
  },
  'click .btn-downvote': function(event, template) {
    event.preventDefault();
    var questionId = template.data._id;
    Questions.findOne({_id: questionId}).downvote(Meteor.user()._id);
  }
});

/*****************************************************************************/
/* Question: Helpers */
/*****************************************************************************/
Template.Question.helpers({
});

/*****************************************************************************/
/* Question: Lifecycle Hooks */
/*****************************************************************************/
Template.Question.onCreated(function () {
});

Template.Question.onRendered(function () {
});

Template.Question.onDestroyed(function () {
});
