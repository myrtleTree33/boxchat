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
        title: Meteor.settings.public['default_public_forum_name']
      })._id;
      console.log(forumId);
      Router.go('forum', {
        id: forumId
      });
    }, 200);
  }
});

Template.Main.onDestroyed(function() {});
