/*****************************************************************************/
/* AnalyticsUserContribTable: Event Handlers */
/*****************************************************************************/
Template.AnalyticsUserContribTable.events({});

/*****************************************************************************/
/* AnalyticsUserContribTable: Helpers */
/*****************************************************************************/
Template.AnalyticsUserContribTable.helpers({
  getUsersContrib: function() {
    var bla = Template.instance().usersContrib.get();
    return bla;
  }
});

/*****************************************************************************/
/* AnalyticsUserContribTable: Lifecycle Hooks */
/*****************************************************************************/
Template.AnalyticsUserContribTable.onCreated(function() {
  var scope = this;
  scope.usersContrib = new ReactiveVar('');
  var forumId = Router.current().params.id;
  Meteor.call('analytics/getUserContrib', forumId, function(err, result) {
    scope.usersContrib.set(result);
  });
});

Template.AnalyticsUserContribTable.onRendered(function() {});

Template.AnalyticsUserContribTable.onDestroyed(function() {});
