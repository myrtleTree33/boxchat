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
    return Meteor.users.findOne({_id: Template.instance().data.authorId}).profile['name'];
  }
  
/*  createdDate: function(){
    return Meteor.users.findOne({_id: Template.instance().data.createdAt}).profile['name'];
  }*/
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
