Template.MasterLayout.helpers({
  hasEmail: function() {
    if (!('emails' in Meteor.user()) ) {
      return false;
    }

    // success
    return true;
  }
});

Template.MasterLayout.events({
});
