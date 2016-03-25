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
    return Meteor.users.findOne({_id: Template.instance().data.authorId}).profile['name'].toString();
  },
  
  creationTime: function() {
    return getProperTime(Template.instance().data.createdAt);
  }
  
  //lastReplyTime: getProperTime()
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

function getProperTime(date) {
    var creationTime = new Date(date);
    var creationDay = creationTime.toDateString();
    var now = new Date();
    var today = now.toDateString();
    if (creationDay == today) {
      return creationTime.getHours() + ':' + creationTime.getMinutes();  
    } else if (creationTime.getFullYear() == now.getFullYear()) {
      return creationTime.getDate() + '-' + parseInt(creationTime.getMonth() + 1);
    } else {
      return creationTime.getDate() + '-' + creationTime.getMonth() + '-' + creationTime.getFullYear();
    }
}