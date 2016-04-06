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
  name: function() {
    return Meteor.user().profile.name;
  },

  displayedName: function() {
    return Meteor.user().profile.displayedName;
  },

  self_description: function() {
    return Meteor.user().profile.self_description;
  },

  forums: function() {
    return Forums.find({
      all: Meteor.user()._id
    }, {
      sort: {createdAt: -1}
    });
  },

  forumNum: function() {
    var length = Forums.find({
      all: Meteor.user()._id
    }).count();
    return length;
  },

  askedQuestions: function() {
    return Questions.find({
      authorId:Meteor.user()._id
    }, {
      sort: {createdAt: -1}
    });
  },

  askNum: function() {
    var length = Questions.find({
      authorId:Meteor.user()._id
    }).count();
    return length > 0 ? length : false;
  },

  answeredQuestions: function() {
    return Interactions.find({
      authorId:Meteor.user()._id
    }, {
      sort: {createdAt: -1}
    });
  },

  answerNum: function() {
    var length = Interactions.find({
      authorId:Meteor.user()._id
    }).count();
    return length;
  },

  followedQuestions: function() {
    return Meteor.user().profile.followedQuestions;
  },

  followNum: function() {
    // var length = Meteor.user().profile.followedQuestions.length;
    // return length > 0 ? length : false;
    return true;
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
