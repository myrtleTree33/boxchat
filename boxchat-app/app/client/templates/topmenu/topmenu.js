/*****************************************************************************/
/* Topmenu: Event Handlers */
/*****************************************************************************/

Template.Topmenu.events({
  'click #btn-logout': function(event) {
    Meteor.logout(function(err) {
      if (err) {
        throw new Meteor.error("Logout failed");
      }
      // hotfix to properly allow iron router to go back to home
      // page, not unauthorized
      setTimeout(function() {
        Router.go('/');
      }, 200);
    });
  },

  'click #btn-logo': function(event) {
    // Toggle forum bar in another template to show
    $('.forumbar.sidebar')
      .sidebar('setting', 'transition', 'push')
      .sidebar('toggle');
  },

  'click #btn-profile': function(event) {
    Router.go('/profile');
  },

  'click #btn-createForum': function(event) {
    Router.go('forumCreate');
  },

  'click #btn-currentForum': function(event) {
    var forumId = Meteor.user().profile.currForum;
    if (forumId) {
      Router.go('forum', {
        id: forumId
      });
    } else { // handle case for new user
      Router.go('/profile');
    }
  },

  'click #btn-forum-settings': function(event) {
    var forumId = Meteor.user().profile.currForum;
    if (forumId) {
      Router.go('forumSettings', {
        id: forumId
      });
    } else { // handle case for new user
      Router.go('/profile');
    }
  },

  'click #btn-settings': function(event) {
    var forumId = Meteor.user().profile.currForum;
    if (forumId) {
      Router.go('userSettings');
    } else { // handle case for new user
      Router.go('/profile');
    }
  },

  'click #btn-analytics': function(event) {
    console.log("Pressed");
    var forumId = Meteor.user().profile.currForum;
    if (forumId) {
      Router.go('forumAnalytics', {
        id: forumId
      });
    } else { // handle case for new user
      Router.go('/profile');
    }
  }

});

/*****************************************************************************/
/* Sidebar: Helpers */
/*****************************************************************************/
Template.Topmenu.helpers({
  name: function() {
    return Meteor.user().profile.name;
  },

  currentForum: function() {
    return Forums.findOne({
      _id: Meteor.user().profile.currForum
    }).title;
  },

  forums: function() {
    return Forums.find({
      all: Meteor.userId()
    });
  }
});

/*****************************************************************************/
/* Sidebar: Lifecycle Hooks */
/*****************************************************************************/
Template.Topmenu.onCreated(function() {});

Template.Topmenu.onRendered(function() {});

Template.Topmenu.onDestroyed(function() {});
