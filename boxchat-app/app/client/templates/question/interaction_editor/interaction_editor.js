/*****************************************************************************/
/* InteractionEditor: Event Handlers */
/*****************************************************************************/
Template.InteractionEditor.events({
  'input #response-content': function(event, template) {
    template.input.set($('#response-content').val());
  },

  'submit #form-response-editor': function(event) {
    event.preventDefault();
    var obj = event.target;
    var content = obj.content.value;
    var questionId = Router.current().params.id;

    var formData = {
      authorId: Meteor.user()._id,
      createdAt: new Date(),
      questionId: questionId,
      forumId: Template.instance().data.forumId,
      content: content.trim(),
      votes: 0
    };

    Meteor.call('interaction/create', formData, function(err, result) {
      if (err) {
        Bert.alert('Oops, error posting interaction: ' + err, 'warning', 'growl-top-right');
        return;
      }
      Bert.alert('Interaction successfully posted!', 'success', 'growl-top-right');
      obj.content.value = ""; // clear the form if successful
    });
  }
});

/*****************************************************************************/
/* InteractionEditor: Helpers */
/*****************************************************************************/
Template.InteractionEditor.helpers({
  responseContent: function() {
    return {
      'text': Template.instance().input.get()
    };
  }
});

/*****************************************************************************/
/* InteractionEditor: Lifecycle Hooks */
/*****************************************************************************/
Template.InteractionEditor.onCreated(function() {
  this.input = new ReactiveVar('');
});

Template.InteractionEditor.onRendered(function() {});

Template.InteractionEditor.onDestroyed(function() {});
