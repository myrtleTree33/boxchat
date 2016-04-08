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
    var tags = obj.stickyTags.value.split(/[ ,]+/).filter(Boolean);

    console.log('-----------')
    console.log(users);

    var escapeTags = function(tags) {
      var output = [];
      for (var i = 0; i < tags.length; i++) {
        var t = tags[i];
        console.log(t)
        if (t.charAt(0) !== '#') {
          console.log('here');
          t = '#' + t;
        }
        output.push(t);
      }
      return output;
    }

    var _tags = escapeTags(tags); // properly format hashtag
    var allUsers = [Meteor.user()._id].concat(users);
    var adminUsers = [Meteor.user()._id];

    var formData = {
      createdAt: new Date(),
      all: allUsers,
      students: users,
      admin: adminUsers,
      title: title,
      description: description,
      questionIds: [],
      tags: _tags
    };


    //get the captcha data
    var captchaData = grecaptcha.getResponse();

    Meteor.call('forum/createForumFormValidify', formData, captchaData, function(error, forumId) {
      // reset the captcha
      grecaptcha.reset();
      if (error) {
        Bert.alert('Oops, error creating forum!', 'danger', 'growl-top-right');
      } else {
        Bert.alert('Created forum successfully!', 'success', 'growl-top-right');

        Router.go('forum', {
          id: forumId
        });
      }
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
Template.ForumCreate.onCreated(function() {});

Template.ForumCreate.onRendered(function() {

  $('.ui.dropdown').dropdown();
  Meteor.call('topMenu/toggleMenuItem', '#btn-createForum');

  $('#forum-tags').selectize({
    delimiter: ',',
    persist: false,
    options: [{
      text: '#exam',
      value: '#exam'
    }, {
      text: '#midterm',
      value: '#midterm'
    }, {
      text: '#important',
      value: '#important'
    }, {
      text: '#tut1',
      value: '#tut1'
    }, {
      text: '#tut2',
      value: '#tut2'
    }, {
      text: '#tut3',
      value: '#tut3'
    }, {
      text: '#tut4',
      value: '#tut4'
    }, {
      text: '#tut5',
      value: '#tut5'
    }],
    create: function(input) {
      return {
        value: input,
        text: input
      }
    }
  });

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
