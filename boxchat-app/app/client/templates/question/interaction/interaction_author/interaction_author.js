/*****************************************************************************/
/* InteractionAuthor: Event Handlers */
/*****************************************************************************/
Template.InteractionAuthor.events({
});

/*****************************************************************************/
/* InteractionAuthor: Helpers */
/*****************************************************************************/
Template.InteractionAuthor.helpers({
  creationTime: function() {
    return moment(Template.instance().data.interaction.createdAt).fromNow();
  }
});

/*****************************************************************************/
/* InteractionAuthor: Lifecycle Hooks */
/*****************************************************************************/
Template.InteractionAuthor.onCreated(function () {
});

Template.InteractionAuthor.onRendered(function () {
});

Template.InteractionAuthor.onDestroyed(function () {
});
