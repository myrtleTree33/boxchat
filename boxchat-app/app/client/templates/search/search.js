/*****************************************************************************/
/* Search: Event Handlers */
/*****************************************************************************/
Template.Search.events({
  'submit #forum-search': function(event, template) {
    event.preventDefault();
    var query = event.target.query.value;
    Session.set('forumQuery', query);
  }
});

/*****************************************************************************/
/* Search: Helpers */
/*****************************************************************************/
Template.Search.helpers({});

/*****************************************************************************/
/* Search: Lifecycle Hooks */
/*****************************************************************************/
Template.Search.onCreated(function() {});

Template.Search.onRendered(function() {
  $('#input-tags').selectize({
    delimiter: ',',
    persist: false,
    create: function(input) {
      return {
        title: input
      };
    },
    valueField: 'title',
    labelField: 'title',
    searchField: ['title', 'tags'],
    render: {
      item: function(item, escape) {
        var title = escape(item.title);
        return '<div>' +
          (item.title ? '<span class="forum-search-title">' + title + '</span>' : '') +
          '</div>';
      },
      option: function(item, escape) {
        var title = escape(item.title);
        return '<div>' +
          (item.title ? '<span class="forum-search-title">' + title + '</span>' : '') +
          '</div>';
      }
    },
    load: function(query, callback) {
      var results = [];
      var forumId = Router.current().params.id;
      if (query.charAt(0) === '#') {
        results = Tags.find({
          forumId: forumId,
          tag: {
            $regex: '.*' + query + '.*'
          }
        }, {
          sort: {
            count: -1
          },
          limit: 7
        }).fetch();
        results = _.map(results, function(element) {
          return {
            title: element.tag
          };
        });

      } else {
        results = Questions.find({
          forumId: forumId,
          title: {
            $regex: '.*' + query + '.*'
          }
        }, {
          sort: {
            count: -1
          },
          limit: 7
        }).fetch();
        results = _.map(results, function(element) {
          return {
            title: element.title
          };
        });
      }

      callback(results);
    }
  });
});

Template.Search.onDestroyed(function() {});
