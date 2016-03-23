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
      Router.go('forum', {
        id: result
      });
    });
  }
});

/*****************************************************************************/
/* ForumCreate: Helpers */
/*****************************************************************************/
Template.ForumCreate.helpers({});

/*****************************************************************************/
/* ForumCreate: Lifecycle Hooks */
/*****************************************************************************/
Template.ForumCreate.onCreated(function() {
});

Template.ForumCreate.onRendered(function() {
  $('#forum-users').selectize({
    delimiter: ',',
    persist: false,
    create: function(input) {
      return {
        'profile.name': input
      };
    },
    valueField: '_id',
    labelField: 'profile.email',
    searchField: ['profile.email'],
    render: {
      item: function(item, escape) {
        var email = escape(item.profile.email);
        return '<div>' +
          ('<span class="forum-search-title">' + email + '</span>') +
          '</div>';
      },
      option: function(item, escape) {
        var email = escape(item.profile.email);
        return '<div>' +
          ('<span class="forum-search-title">' + email + '</span>') +
          '</div>';
      }
    },
    load: function(query, callback) {
      console.log(query);
      console.log(Meteor.users.find({}).fetch());
      var results = Meteor.users.find({
        'profile.name': {
          $regex: '.*' + query + '.*',
          $options: 'i'
        }
      }, {
        limit: 7
      }).fetch();
      console.log(results);
      callback(results);
    }
  });
});

Template.ForumCreate.onDestroyed(function() {});
