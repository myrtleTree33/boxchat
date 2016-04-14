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
Template.Main.helpers({});

/*****************************************************************************/
/* Main: Lifecycle Hooks */
/*****************************************************************************/
Template.Main.onCreated(function() {
  Meteor.call('signup/addUserToImprovementsForum');
});

Template.Main.onRendered(function() {
  $('.ui.dropdown').dropdown();
  Meteor.call('topMenu/toggleMenuItem', '#btn-currentForum');

  // go to last opened forum page
  var currForum = Meteor.user().profile['currForum'];
  if (currForum) {
    Router.go('forum', {
      id: currForum
    });
  } else {
    setTimeout(function() {
      var forumId = Forums.findOne({
        title: 'Improvements forum'
      })._id;
      console.log(forumId);
      Router.go('forum', {
        id: forumId
      });
    }, 50);
  }
});

Template.Main.onDestroyed(function() {});
