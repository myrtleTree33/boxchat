Template.MasterLayout.helpers({
  hasEmail: function() {
    var profile = Meteor.user()['profile'];
    if (!('emails' in profile) ) {
      return false;
    }

    if (profile.emails.constructor !== Array) {
      return false;
    }

    if (profile.emails.length === 0) {
      return false;
    }
    
    // success
    return true;
  },

});

Template.MasterLayout.events({
});
