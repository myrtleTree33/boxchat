/*****************************************************************************/
/* ForumCreate: Event Handlers */
/*****************************************************************************/
Template.ForumCreate.events({
  'submit #form-create-forum': function(event, template) {
    event.preventDefault();
    var obj = event.target;
    var title = obj.title.value;
    // empty or array: S/O http://stackoverflow.com/questions/10346722/how-can-i-split-a-javascript-string-by-white-space-or-comma
    var users = obj.users.value.split(/[ ,]+/).filter(Boolean);
    var description = obj.description.value;
    var tags = obj.topics.value.split(',');

    Forums.insert({
      createdAt: new Date(),
      all: [Meteor.user()._id].concat(users),
      students: users,
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
        'name': input
      };
    },
    valueField: '_id',
    labelField: 'name',
    searchField: ['name'],
    render: {
      item: function(item, escape) {
        var name = escape(item.name);
        return '<div>' +
          ('<span class="forum-search-title">' + name + '</span>') +
          '</div>';
      },
      option: function(item, escape) {
        var name = escape(item.name);
        return '<div>' +
          ('<span class="forum-search-title">' + name + '</span>') +
          '</div>';
      }
    },
    load: function(query, callback) {
      var results = Meteor.users.find({
        'profile.name': {
          $regex: '.*' + query + '.*',
          $options: 'i'
        }
      }, {
        limit: 7
      }).fetch();
      var _results = _.map(results, function(user) {
        return {
          _id: user._id,
          name: user.profile['name']
        }
      });
      callback(_results);
    }
  });
});

Template.ForumCreate.onDestroyed(function() {});
