/*****************************************************************************/
/* Topmenu: Event Handlers */
/*****************************************************************************/

Template.Topmenu.events({
  'click .member':function(event) {
    const tgt = event.target;
    $('.member').removeClass('active');
    $(tgt).addClass('active');
  },

  'click #btn-logout': function(event) {
    Meteor.logout(function(err) {
      if (err) {
        throw new Meteor.error("Logout failed");
      } else {
      // hotfix to properly allow iron router to go back to home
      // page, not unauthorized
      setTimeout(function() {
        Router.go('/');
      }, 200);
        //Router.go('home');
      }
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

  'click #btn-user-settings': function(event) {
    Router.go('userSettings');
  },

  'click #btn-analytics': function(event) {
    var forumId = Meteor.user().profile.currForum;
    if (forumId) {
      Router.go('forumAnalytics', {
        id: forumId
      });
    } else { // handle case for new user
      Router.go('/profile');
    }
  },

  'click #btn-public-forum': function(event) {
    var forumId = Forums.findOne({
      title: "Public Forum"
    })._id;
    Router.go('forum', {
        id: forumId
    });
  },

  'click .dd': function(event) {
    $('.topmenu .member').removeClass('active');
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
