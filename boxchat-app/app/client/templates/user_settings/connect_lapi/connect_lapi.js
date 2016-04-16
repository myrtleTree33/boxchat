/*****************************************************************************/
/* ConnectLapi: Event Handlers */
/*****************************************************************************/
Template.ConnectLapi.events({
  'click #btn-connect-lapi': function(event, template) {
    var lapi = Meteor.settings.public.lapi;
    var loginUrl = lapi.apiDomain + "api/login/?apikey=" + lapi.apiKey + "&url=" + lapi.redirect;
  }
});

/*****************************************************************************/
/* ConnectLapi: Helpers */
/*****************************************************************************/
Template.ConnectLapi.helpers({
});

/*****************************************************************************/
/* ConnectLapi: Lifecycle Hooks */
/*****************************************************************************/
Template.ConnectLapi.onCreated(function () {
});

Template.ConnectLapi.onRendered(function () {
});

Template.ConnectLapi.onDestroyed(function () {
});
