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
    var queries = Session.get('forumQuery').split(',');
    var tags = [];
    var topics = [];
    for (var i = 0; i < queries.length; i++) {
      var q = queries[i];
      if (q.charAt(0) === '#') {
        tags.push(q);
      } else if (q !== '') {
        topics.push(q);
      }
    }

    var forumId = Router.current().params.id;

    function formatQuery(forumId, tags, topics) {
      var query = {};
      query.forumId = forumId;
      if (tags.length > 0) {
        query.tags = {
          '$in': tags
        };
      }
      if (topics.length > 0) {
        query.title = {
          '$in': topics
        };
      }
      return query;
    }

    return Questions.find(formatQuery(forumId, tags, topics), {
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
  Session.set("forumQuery", '');
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

Template.Forum.onRendered(function() {});

Template.Forum.onDestroyed(function() {});
