/*****************************************************************************/
/* Todos: Event Handlers */
/*****************************************************************************/
Template.Todos.events({
  'submit .new-task': function(event) {
    event.preventDefault();
    var text = event.target.text.value;

    console.log(text);

    Task.insert({
      text: text,
      createdAt: new Date()
    });

    event.target.text.value = '';
  }
});

/*****************************************************************************/
/* Todos: Helpers */
/*****************************************************************************/
Template.Todos.helpers({
  tasks: function() {
    return Task.find({}, {
      sort: {
        createdAt: -1
      }
    });
  }
});

/*****************************************************************************/
/* Todos: Lifecycle Hooks */
/*****************************************************************************/
Template.Todos.onCreated(function() {});

Template.Todos.onRendered(function() {});

Template.Todos.onDestroyed(function() {});
