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
  interactionAuthor: function() {
    var author = Meteor.users.findOne({_id: Template.instance().data.authorId}),
    interaction = Template.instance().data;
    return {
      author: author,
      interaction: interaction
    };
  },
  
  author: function() {
    return Meteor.users.findOne({_id: Template.instance().data.authorId}).profile.name;
  },
  
  time: function() {
    var time = Template.instance().data.createdAt;
    var date = new Date(time);
    var year = date.getFullYear();
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + date.getMonth()).slice(-2);
    var hour = ("0" + date.getHours()).slice(-2);
    var minute = ("0" + date.getMinutes()).slice(-2);
    var second = ("0" + date.getSeconds()).slice(-2);
    var creation = day + "-" + month + "-" + year + " " + hour + ":" + minute + ":" + second;
    return creation;
  },
  
  content: function() {
    return Template.instance().data.content;
  }
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
