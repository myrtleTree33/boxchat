/*****************************************************************************/
/* ForumSettings: Event Handlers */
/*****************************************************************************/
Template.ForumSettings.events({
  'submit #form-forum-settings': function(event, template) {
    event.preventDefault();
    var forumId = Router.current().params.id;
    var obj = event.target;
    var title = obj.title.value;
    // empty or array: S/O http://stackoverflow.com/questions/10346722/how-can-i-split-a-javascript-string-by-white-space-or-comma
    var all = obj.users.value.split(/[ ,]+/).filter(Boolean);
    var admin = obj.admin.value.split(/[ ,]+/).filter(Boolean);
    admin = lodash.union(admin, [Meteor.userId()]) // user should always be admin of his own forum
    all = lodash.union(all, admin); // add all admin in as well
    var students = lodash.pull(all, admin);
    var description = obj.description.value;
    var tags = obj.topics.value.split(',');

    var oldForum = Forums.findOne(forumId);
    var oldAll = oldForum.all;
    var oldAdmin = oldForum.admin;

    var diffAll = lodash.difference(oldAll, all);
    var diffAdmin = lodash.difference(oldAll, admin);

    Meteor.call('userPermissions/removeForum',
      diffAll, ['all'], forumId);
    Meteor.call('userPermissions/removeForum',
      diffAdmin, ['admin'], forumId);

    try {
      Forums.update({
        _id: forumId
      }, {
        $set: {
          title: title,
          description: description,
          tags: tags,
          all: all,
          admin: admin,
          students: students
        }
      });

      Meteor.call('userPermissions/addForum',
        all, ['all'], forumId);
      Meteor.call('userPermissions/addForum',
        admin, ['admin'], forumId);

      Bert.alert('Forum successfully updated.', 'success');

    } catch (e) {
      Bert.alert('Oops!  Unable to update forum.', 'danger');
    }
  }
});

/*****************************************************************************/
/* ForumSettings: Helpers */
/*****************************************************************************/
Template.ForumSettings.helpers({
  tagsString: function() {
    return Template.instance().data.tags.join();
  },
  forumUsers: function() {
    var userIds = Template.instance().data.all;
    return Meteor.users.find({
      _id: {
        $in: userIds
      }
    });
  }
});

/*****************************************************************************/
/* ForumSettings: Lifecycle Hooks */
/*****************************************************************************/
Template.ForumSettings.onCreated(function() {
  var forumId = Template.instance().data._id;
  var publicForumId = Forums.findOne({
    title: Meteor.settings.public['default_public_forum_name']
  })._id;
  // if they are the same, do not allow user to go to settings page
  // route back to main page
  if (forumId === publicForumId) {
    return Router.go('/', {});
  }

  Meteor.call('userPermissions/checkPermissions',
    Meteor.userId(), 'admin', forumId);
});

Template.ForumSettings.onRendered(function() {

  $('.ui.dropdown').dropdown();
  Meteor.call('topMenu/toggleMenuItem', '#btn-forum-settings');

  var setupUsersField = function(selector, field) {
    var select = $(selector).selectize({
      plugins: {
        'remove_button': {}
      },
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

    var userIds = Template.instance().data[field];
    var users = Meteor.users.find({
      _id: {
        $in: userIds
      }
    }).fetch();
    var userItems = _.map(users, function(user) {
      return {
        name: user.profile['name'],
        _id: user._id
      };
    });

    var sselect = select[0].selectize;
    _(userItems).each(function(item) {
      sselect.addOption(item);
      sselect.refreshOptions();
      sselect.addItem(item._id, false);
    });
    return sselect; // return instance
  };
  setupUsersField('#forum-users', 'all');
  setupUsersField('#forum-admin', 'admin');
});

Template.ForumSettings.onDestroyed(function() {});
