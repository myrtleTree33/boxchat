/*****************************************************************************/
/* Interaction: Event Handlers */
/*****************************************************************************/
Template.Interaction.events({
  'click .btn-interaction-upvote': function(event, template) {
    event.preventDefault();
    var interactionId = template.data._id;
    Interactions.findOne({_id: interactionId}).upvote(Meteor.user()._id);
  },
  'click .btn-interaction-downvote': function(event, template) {
    event.preventDefault();
    var interactionId = template.data._id;
    Interactions.findOne({_id: interactionId}).downvote(Meteor.user()._id);
  }
});

/*****************************************************************************/
/* Interaction: Helpers */
/*****************************************************************************/
Template.Interaction.helpers({
});

/*****************************************************************************/
/* Interaction: Lifecycle Hooks */
/*****************************************************************************/
Template.Interaction.onCreated(function () {
});

Template.Interaction.onRendered(function () {
});

Template.Interaction.onDestroyed(function () {
});
