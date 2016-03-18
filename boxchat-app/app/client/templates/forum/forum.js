/*****************************************************************************/
/* Forum: Event Handlers */
/*****************************************************************************/
Template.Forum.events({
  'click #btn-ask': function(event, template) {
    var forumId = Router.current().params.id;
    Router.go('ask', {
      forumId: forumId
    });
  }
});

/*****************************************************************************/
/* Forum: Helpers */
/*****************************************************************************/
Template.Forum.helpers({
  questions: function() {
    var forumId = Router.current().params.id;

    return Questions.find({
      forumId: forumId
    }, {
      sort: {
        createdAt: -1
      }
    });
  }
});

/*****************************************************************************/
/* Forum: Lifecycle Hooks */
/*****************************************************************************/
Template.Forum.onCreated(function() {
  var forumId = Router.current().params.id;
  var userId = Meteor.user()._id;
  Meteor.users.update({
    _id: userId
  }, {
    $set: {
      'profile.currForum': forumId
    }
  });
});

Template.Forum.onRendered(function() {
});

Template.Forum.onDestroyed(function() {});
