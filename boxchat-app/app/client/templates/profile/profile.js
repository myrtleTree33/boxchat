/*****************************************************************************/
/* Profile: Event Handlers */
/*****************************************************************************/
Template.Profile.events({
  'click #btn-create-forum': function(event, template) {
    Router.go('forumCreate');
  }
/*
  'click .btn-forum': function(event, this) {
    Router.go('forum', {
        id: this._id;
    });
  }*/
});

/*****************************************************************************/
/* Profile: Helpers */
/*****************************************************************************/
Template.Profile.helpers({
  forums: function() {
    return Forums.find({
      all: Meteor.user()._id
    }, {
      sort: {
        createdAt: -1
      }
    });
  },
  
  name: function() {
    return Meteor.user().profile.name;
  },
  
  displayedName: function() {
    return Meteor.user().profile.displayedName;
  },
  
  self_description: function() {
    return Meteor.user().profile.self_description;
  },
  
  enrolledForums: function() {
    return Meteor.user().profile.enrolledForums;
  },
  
  askedQuestions: function() {
    return Meteor.user().profile.askedQuestions;
  },
  
  answeredQuestions: function() {
    return Meteor.user().profile.answeredQuestions;
  }
  
});

/*****************************************************************************/
/* Profile: Lifecycle Hooks */
/*****************************************************************************/
Template.Profile.onCreated(function () {
});

Template.Profile.onRendered(function () {
});

Template.Profile.onDestroyed(function () {
});
