/*****************************************************************************/
/* Sidebar: Event Handlers */
/*****************************************************************************/
Template.Sidebar.events({
  'click #btn-logout': function(event) {
    Meteor.logout(function(err) {
      if (err) {
        throw new Meteor.error("Logout failed");
      }
    })
  },

  'click #btn-forum': function(event) {
    var forumId = Meteor.user().profile.currForum;
    if (forumId) {
      Router.go('forum', {
        id: forumId
      });
    } else { // handle case for new user
      Router.go('/profile');
    }
  },

  'click #btn-forums': function(event) {
    // Toggle forum bar in another template to show
    $('.forumbar.sidebar')
      .sidebar('setting', 'transition', 'push')
      .sidebar('toggle');
  },

  'click #btn-settings': function(event) {
    var forumId = Meteor.user().profile.currForum;
    if (forumId) {
      Router.go('forumSettings', {
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
Template.Sidebar.helpers({
});

/*****************************************************************************/
/* Sidebar: Lifecycle Hooks */
/*****************************************************************************/
Template.Sidebar.onCreated(function() {});

Template.Sidebar.onRendered(function() {});

Template.Sidebar.onDestroyed(function() {});
