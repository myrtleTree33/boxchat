/*****************************************************************************/
/* Unauthorized: Event Handlers */
/*****************************************************************************/
Template.Unauthorized.events({});

/*****************************************************************************/
/* Unauthorized: Helpers */
/*****************************************************************************/
Template.Unauthorized.helpers({});

/*****************************************************************************/
/* Unauthorized: Lifecycle Hooks */
/*****************************************************************************/
Template.Unauthorized.onCreated(function() {});

Template.Unauthorized.onRendered(function() {
  $('.ui.dropdown').dropdown();
  Meteor.call('topMenu/toggleMenuItem', '');

  // TODO hack redirect to public page instead
  setTimeout(function() {
    var forumId = Forums.findOne({
      title: Meteor.settings.public['default_public_forum_name']
    })._id;

    Router.go('forum', {
      id: forumId
    });
  }, 200);
});

Template.Unauthorized.onDestroyed(function() {});
