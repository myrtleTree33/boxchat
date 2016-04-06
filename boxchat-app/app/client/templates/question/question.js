/*****************************************************************************/
/* Question: Event Handlers */
/*****************************************************************************/
Template.Question.events({
  'click #backToForum': function(event, template) {
    Router.go('forum', {id: template.data.forumId});
  }
});

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
  },
  
  currentForum: function() {
    var forumId = Meteor.user().profile.currForum;
    return Forums.findOne({_id: forumId}).title;
  },
  
  questions: function() {
    return Questions.find({
      forumId: Meteor.user().profile.currForum
    }, {
      sort: {createdAt: -1}
    });
  }
});

/*****************************************************************************/
/* Question: Lifecycle Hooks */
/*****************************************************************************/
Template.Question.onCreated(function() {});

Template.Question.onRendered(function() {});

Template.Question.onDestroyed(function() {});
