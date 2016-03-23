/*****************************************************************************/
/* Home: Event Handlers */
/*****************************************************************************/
Template.Home.events({});

/*****************************************************************************/
/* Home: Helpers */
/*****************************************************************************/
Template.Home.helpers({});

/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.Home.onCreated(function() {});

Template.Home.onRendered(function() {
  // go to last opened forum page
  var currForum = Meteor.user().profile[currForum];
  if (currForum) {
    Router.go('forum', {
      id: currForum
    });
  }
});

Template.Home.onDestroyed(function() {});
