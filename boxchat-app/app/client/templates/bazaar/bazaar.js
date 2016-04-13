/*****************************************************************************/
/* Bazaar: Event Handlers */
/*****************************************************************************/
Template.Bazaar.events({
    'click #btn-ask': function(event, template) {
        Router.go('ask', {
            forumId: "bazaar"
        });
    }
});

/*****************************************************************************/
/* Bazaar: Helpers */
/*****************************************************************************/
Template.Bazaar.helpers({
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
    
        var forumId = "bazaar";
    
        function formatQuery(forumId, tags, topics) {
          var query = [];
          if (tags.length > 0) {
            query.push({
              tags: {
                '$in': tags
              },
              forumId: forumId
            });
          }
          if (topics.length > 0) {
            query.push({
              title: {
                '$in': topics
              },
              forumId: forumId
            });
            query.push({
              content: {
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
    },
    
    topUsers: function() {
        var forumUsers = Meteor.users;
        var rank = [];
        forumUsers.forEach(function(userId) {
          rank.push([userId, Interactions.find({
            authorId: userId,
            forumId: "bazaar"
          }).count()]);
        });
    
        rank.sort(function(a, b) {
          return b[1] - a[1];
        });
    
        var ret = [];
        for (var i = 0; i < 5; i++) {
          if (rank[i] == null) break;
          if (rank[i][1] > 0) ret.push([rank[i][0], parseInt(i + 1), rank[i][1]]);
        }
    
        return ret;
    },
    
    forumHotTopics: function() {
      var forumId = "bazaar";
      // find hottest trending qns in the past 3 days
      var hottestQuestions = Questions.find({
        forumId: forumId,
        createdAt: {
          $gte: moment().subtract(3, 'days').toDate()
        }
      }, {
        sort: {
          votes: -1,
        },
        limit: 10
      }).fetch();
      return hottestQuestions;
    }
});

/*****************************************************************************/
/* Bazaar: Lifecycle Hooks */
/*****************************************************************************/
Template.Bazaar.onCreated(function () {
});

Template.Bazaar.onRendered(function () {
});

Template.Bazaar.onDestroyed(function () {
});
