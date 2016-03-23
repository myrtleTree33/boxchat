/*****************************************************************************/
/* ForumSettings: Event Handlers */
/*****************************************************************************/
Template.ForumSettings.events({});

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
Template.ForumSettings.onCreated(function() {});

Template.ForumSettings.onRendered(function() {
  var select = $('#forum-users').selectize({
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

    var userIds = Template.instance().data.all;
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


});

Template.ForumSettings.onDestroyed(function() {});
