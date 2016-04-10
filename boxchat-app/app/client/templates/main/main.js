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
