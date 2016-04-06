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

    Interactions.insert({
      authorId: Meteor.user()._id,
      createdAt: new Date(),
      questionId: questionId,
      forumId: Template.instance().data.forumId,
      content: content,
      votes: 0
    }, function(err, result) {
      if (err) {
        Bert.alert('Oops, something went wrong', 'danger');
        return;
      }
      Bert.alert('Question successfully posted!', 'success');
      obj.content.value = "";  // clear the form if successful
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
