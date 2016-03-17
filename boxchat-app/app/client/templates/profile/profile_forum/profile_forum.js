/*****************************************************************************/
/* ProfileForum: Event Handlers */
/*****************************************************************************/
Template.ProfileForum.events({
  'click .forum-header': function(event, template) {
    Router.go('forum', {id: template.data._id});
  }
});

/*****************************************************************************/
/* ProfileForum: Helpers */
/*****************************************************************************/
Template.ProfileForum.helpers({
});

/*****************************************************************************/
/* ProfileForum: Lifecycle Hooks */
/*****************************************************************************/
Template.ProfileForum.onCreated(function () {
});

Template.ProfileForum.onRendered(function () {
});

Template.ProfileForum.onDestroyed(function () {
});
