/*****************************************************************************/
/* Forum: Event Handlers */
/*****************************************************************************/
Template.Forum.events({
  'click #btn-ask': function(event) {
    Questions.insert({
      authorId: Meteor.user()._id,
      createdAt: new Date(),
      text: 'Where do I go to login?',
      votes: 5,
      views: 10,
      tags: ['CS3226', 'interesting', 'exams']
    });
  }
});

/*****************************************************************************/
/* Forum: Helpers */
/*****************************************************************************/
Template.Forum.helpers({
  questions: function() {
    return Questions.find({}, {
      sort: {
        createdAt: -1
      }
    });
  }
});

/*****************************************************************************/
/* Forum: Lifecycle Hooks */
/*****************************************************************************/
Template.Forum.onCreated(function () {
});

Template.Forum.onRendered(function () {
});

Template.Forum.onDestroyed(function () {
});
