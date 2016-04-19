/*****************************************************************************/
/* AnalyticsUserContrib: Event Handlers */
/*****************************************************************************/
Template.AnalyticsUserContrib.events({});

/*****************************************************************************/
/* AnalyticsUserContrib: Helpers */
/*****************************************************************************/
Template.AnalyticsUserContrib.helpers({});

/*****************************************************************************/
/* AnalyticsUserContrib: Lifecycle Hooks */
/*****************************************************************************/
Template.AnalyticsUserContrib.onCreated(function() {});

Template.AnalyticsUserContrib.onRendered(function() {
  Session.set('x', ['x', 30, 50, 75, 100, 120]);
  Session.set('data1', ['data1', 30, 200, 100, 400, 150]);
  Session.set('data2', ['data2', 20, 180, 240, 100, 190]);

  var userContribChart = c3.generate({
    bindto: this.find('#graph-user-contrib'),
    data: {
      json: [],
      keys: {
        x: 'name',
        value: ['questions', 'interactions', 'likes']
      },
      type: 'bar'
    },
    axis: {
      x: {
        type: 'category'
      }
    }
  });

  // this.autorun(function(tracker) {
    var forumId = Router.current().params.id;
    Meteor.call('analytics/getUserContrib', forumId, function(err, result) {
      console.log(result);
      userContribChart.load({
        json: result,
        keys: {
          x: 'name',
          value: ['questions', 'interactions', 'likes']
        },
        type: 'bar'
      });
    });
  // });

});

Template.AnalyticsUserContrib.onDestroyed(function() {});
