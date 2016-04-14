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
    return moment(Template.instance().data.createdAt).fromNow();
  },

  forumOwner: function() {
    var adminId = Template.instance().data.admin;
    var admin = Meteor.users.findOne({
      _id: adminId[0]
    });
    return admin;
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

  postsPercentHealth: function() {

    function getUserPostsHealth() {
      var forumId = Template.instance().data._id;

      var posts = Questions.find({
        authorId: Meteor.userId(),
        forumId: forumId
      }).count();

      var totalPosts = Questions.find({
        forumId: forumId
      }).count();

      if (totalPosts === 0) {
        return 0;
      }

      var totalUsers = Forums.findOne(forumId).all.length;
      var avgPosts = totalPosts / totalUsers;

      var health = posts - avgPosts;
      return health;
    }

    var health = getUserPostsHealth();
    return numeral(health).format('0.0a');

  },

  interactionsPercentHealth: function() {

    function getUserInteractionsHealth() {
      var forumId = Template.instance().data._id;

      var interactions = Interactions.find({
        authorId: Meteor.userId(),
        forumId: forumId
      }).count();

      var totalInteractions = Interactions.find({
        forumId: forumId
      }).count();

      if (totalInteractions === 0) {
        return 0;
      }

      var totalUsers = Forums.findOne(forumId).all.length;
      var avgInteractions = totalInteractions / totalUsers;

      var health = interactions - avgInteractions;
      return health;
    }

    var health = getUserInteractionsHealth();
    return numeral(health).format('0.0a');

  },

  forumHotTopics: function() {
    var forumId = Template.instance().data._id;
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
  },

  topUsers: function() {
    var forumUsers = Template.instance().data.all;
    var rank = [];
    forumUsers.forEach(function(userId) {
      rank.push([userId, Interactions.find({
        authorId: userId,
        forumId: Template.instance().data._id
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
  }
});

/*****************************************************************************/
/* Forum: Lifecycle Hooks */
/*****************************************************************************/
Template.Forum.onCreated(function() {
  Session.set("forumQuery", '');
});

Template.Forum.onRendered(function() {
  $('.ui.dropdown').dropdown();
  var forumTitle = Router.current().params.title;
  if (forumTitle !== Meteor.settings.public['default_public_forum_name']) {
    Meteor.call('topMenu/toggleMenuItem', '#btn-currentForum');
  } else {
    Meteor.call('topMenu/toggleMenuItem', '#btn-public-forum');
  }

  $('.progress').each(function(i, ele) {
    $(ele).progress();
  });
});

Template.Forum.onDestroyed(function() {});

// var forumId = Router.current().params.id;
// Meteor.users.update(Meteor.userId(), {
//   $set: {
//     'profile.currForum': forumId
//   }
// });
// console.log('updated');
// console.log(Meteor.user().profile);
