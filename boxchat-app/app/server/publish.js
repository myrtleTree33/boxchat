


Meteor.publish('todos', function () {
  return Todos.find();
});

Meteor.publish('task', function () {
  return Task.find();
});

// automatically push custom fields in user
Meteor.publish(null, function() {
  if(!this.userId) return null;
  return Meteor.users.find(this.userId, {fields: {
    name: 1,
    profileImg: 1
  }});
});
