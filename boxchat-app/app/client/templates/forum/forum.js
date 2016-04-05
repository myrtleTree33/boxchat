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
  description: function() {
    return Template.instance().data.description;
  },
  
  forumCreationDate: function() {
    var time = Template.instance().data.createdAt;
    var date = new Date(time);
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + date.getMonth()).slice(-2);
    var year = date.getFullYear();
    return day + "-" + month + "-" + year;
  },
  
  forumOwner: function() {
    var adminId = Template.instance().data.admin;
    var admin = Meteor.users.findOne({_id: adminId[0]});
    return admin.profile.name;
  },
  
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
      var query = [];
      if (tags.length > 0) {
        query.push({
          tags:{
            '$in': tags
          },
          forumId: forumId
        });
      }
      if (topics.length > 0) {
        query.push({
          title:{
            '$in': topics
          },
          forumId: forumId
        });
        query.push({
          content:{
            '$in': topics
          },
          forumId: forumId
        });
      }

      if (query.length == 0) {
        return {
          forumId: forumId
        };
      } else {
        return {
          $or: query
        };
      }
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
  Meteor.users.update(Meteor.userId(), {
    $set: {
      'profile.currForum': forumId
    }
  });
});

Template.Forum.onRendered(function() {});

Template.Forum.onDestroyed(function() {});
