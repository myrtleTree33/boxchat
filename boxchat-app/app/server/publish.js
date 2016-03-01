


Meteor.publish('todos', function () {
  return Todos.find();
});

Meteor.publish('task', function () {
  return Task.find();
});