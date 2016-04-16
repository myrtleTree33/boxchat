/*****************************************************************************/
/* UserSettings: Event Handlers */
/*****************************************************************************/
Template.UserSettings.events({
  'click .btn-account': function(event) {
    $(".btn-account").addClass("active");
    $(".btn-settingsForums").removeClass("active");
  },

  'click .btn-settingsForums': function(event) {
    $(".btn-account").removeClass("active");
    $(".btn-settingsForums").addClass("active");
  }

});

/*****************************************************************************/
/* UserSettings: Helpers */
/*****************************************************************************/
Template.UserSettings.helpers({
  social: function() {
    var service = _.keys(Meteor.user().services)[0];
    if (service === 'twitter') {
      return true;
    } else if (service === 'facebook') {
      return true;
    } else {
      return false;
    }
  }
});

/*****************************************************************************/
/* UserSettings: Lifecycle Hooks */
/*****************************************************************************/
Template.UserSettings.onCreated(function() {
  Meteor.call('userPermissions/isLogin');
});

Template.UserSettings.onRendered(function() {
  $('.ui.dropdown').dropdown();
  Meteor.call('topMenu/toggleMenuItem', '');

  $('.menu .item')
    .tab();
});

Template.UserSettings.onDestroyed(function() {});
