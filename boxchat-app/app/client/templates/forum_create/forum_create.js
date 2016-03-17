/*****************************************************************************/
/* ForumCreate: Event Handlers */
/*****************************************************************************/
Template.ForumCreate.events({
  'submit #form-create-forum': function(event, template) {
    event.preventDefault();
    var obj = event.target;
    var title = obj.title.value;
    var description = obj.description.value;
    var tags = obj.topics.value.split(',');

    Forums.insert({
      createdAt: new Date(),
      all: [Meteor.user()._id],
      students: [],
      admin: [Meteor.user()._id],
      title: title,
      description: description,
      questionIds: [],
      tags: tags

    }, function(err, result) {
      if (err) {
        Bert.alert('Oops, error creating forum', 'danger');
        return;
      }
      Bert.alert('Forum successfully created!', 'success');
      Router.go('forum', {id: result});
    });
  }
});

/*****************************************************************************/
/* ForumCreate: Helpers */
/*****************************************************************************/
Template.ForumCreate.helpers({
});

/*****************************************************************************/
/* ForumCreate: Lifecycle Hooks */
/*****************************************************************************/
Template.ForumCreate.onCreated(function () {
});

Template.ForumCreate.onRendered(function () {
});

Template.ForumCreate.onDestroyed(function () {
});
