/*****************************************************************************/
/* Topmenu: Event Handlers */
/*****************************************************************************/
Template.Topmenu.events({
  'click #btn-logout': function(event) {
    Meteor.logout(function(err) {
      if (err) {
        throw new Meteor.error("Logout failed");
      }
    })
  },

  'click #btn-logo': function(event) {
    // Toggle forum bar in another template to show
    $('.forumbar.sidebar')
      .sidebar('setting', 'transition', 'push')
      .sidebar('toggle');
  },

  'click #btn-home': function(event) {
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

  'click #btn-settings': function(event) {
    var forumId = Meteor.user().profile.currForum;
    if (forumId) {
      Router.go('forumSettings', {
        id: forumId
      });
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

Template.Topmenu.onRendered(function() {
    $('.ui.dropdown').dropdown();
});

Template.Topmenu.onDestroyed(function() {});
