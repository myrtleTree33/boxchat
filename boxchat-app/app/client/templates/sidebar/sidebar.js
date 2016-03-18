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

  'click #btn-home': function(event) {
    console.log(Meteor.user().profile);
    var forumId = Meteor.user().profile.currForum;
    if (forumId) {
    Router.go('forum', {id: forumId});
    } else {
    Router.go('/profile');
    }
  },

  'click #btn-forums': function(event) {
  },

  'click #btn-profile': function(event) {
    Router.go('/profile');
  }
});

/*****************************************************************************/
/* Sidebar: Helpers */
/*****************************************************************************/
Template.Sidebar.helpers({});

/*****************************************************************************/
/* Sidebar: Lifecycle Hooks */
/*****************************************************************************/
Template.Sidebar.onCreated(function() {
});

Template.Sidebar.onRendered(function() {});

Template.Sidebar.onDestroyed(function() {});
