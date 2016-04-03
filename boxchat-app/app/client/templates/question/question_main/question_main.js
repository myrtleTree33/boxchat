/*****************************************************************************/
/* QuestionMain: Event Handlers */
/*****************************************************************************/
Template.QuestionMain.events({
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
/* QuestionMain: Helpers */
/*****************************************************************************/
Template.QuestionMain.helpers({
    questionAuthor: function() {
    var author = Meteor.users.findOne({_id: Template.instance().data.authorId}),
    question = Template.instance().data;
    return {
      author: author,
      question: question
    };
  }
});

/*****************************************************************************/
/* QuestionMain: Lifecycle Hooks */
/*****************************************************************************/
Template.QuestionMain.onCreated(function () {
});

Template.QuestionMain.onRendered(function () {
});

Template.QuestionMain.onDestroyed(function () {
});