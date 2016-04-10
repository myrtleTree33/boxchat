/*****************************************************************************/
/* Main: Event Handlers */
/*****************************************************************************/
Template.Main.events({
  'click #create-forum': function(event, template) {
    Router.go('forumCreate');
  }
});

/*****************************************************************************/
/* Main: Helpers */
/*****************************************************************************/
Template.Main.helpers({
});

/*****************************************************************************/
/* Main: Lifecycle Hooks */
/*****************************************************************************/
Template.Main.onCreated(function () {
  // on first created, add user to existing forums if needed
  Meteor.call('signup/addPendingForums', Meteor.userId());
});

Template.Main.onRendered(function () {
  // go to last opened forum page
  var currForum = Meteor.user().profile['currForum'];
  if (currForum) {
    Router.go('forum', {
      id: currForum
    });
  }
});

Template.Main.onDestroyed(function () {
});
