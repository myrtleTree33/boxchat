/*****************************************************************************/
/* ForumAnalytics: Event Handlers */
/*****************************************************************************/
Template.ForumAnalytics.events({
});

/*****************************************************************************/
/* ForumAnalytics: Helpers */
/*****************************************************************************/
Template.ForumAnalytics.helpers({
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
  }
});

/*****************************************************************************/
/* ForumAnalytics: Lifecycle Hooks */
/*****************************************************************************/
Template.ForumAnalytics.onCreated(function () {
    var forumId = Template.instance().data._id;

    var publicForumId = Forums.findOne({
      title: Meteor.settings.public['default_public_forum_name']
    })._id;
    // if they are the same, do not allow user to go to settings page
    // route back to main page
    if (forumId === publicForumId) {
      return Router.go('/', {});
    }


    Meteor.call('userPermissions/checkPermissions',
      Meteor.userId(), 'admin', forumId);
});

Template.ForumAnalytics.onRendered(function () {
  $('.ui.dropdown').dropdown();
  Meteor.call('topMenu/toggleMenuItem', '#btn-analytics');
});

Template.ForumAnalytics.onDestroyed(function () {
});
