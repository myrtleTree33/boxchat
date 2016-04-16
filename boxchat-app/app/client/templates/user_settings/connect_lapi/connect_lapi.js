/*****************************************************************************/
/* ConnectLapi: Event Handlers */
/*****************************************************************************/
Template.ConnectLapi.events({
  'click #btn-connect-lapi': function(event, template) {
    var lapi = Meteor.settings.public.lapi;
    var loginUrl = lapi.apiDomain + "api/login/?apikey=" + lapi.apiKey + "&url=" + lapi.redirect;
    window.location = loginUrl;
  }
});

/*****************************************************************************/
/* ConnectLapi: Helpers */
/*****************************************************************************/
Template.ConnectLapi.helpers({
  lapiIsUp: function() {
    return Template.instance().lapiUp.get();
  }
});

/*****************************************************************************/
/* ConnectLapi: Lifecycle Hooks */
/*****************************************************************************/
Template.ConnectLapi.onCreated(function() {
  var scope = this;
  scope.lapiUp = new ReactiveVar(false);
  Meteor.call('lapi/isUp', function(err, status) {
    scope.lapiUp.set(status);
  });
});

Template.ConnectLapi.onRendered(function() {});

Template.ConnectLapi.onDestroyed(function() {});
