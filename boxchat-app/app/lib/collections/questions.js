Questions = new Mongo.Collection('questions');

if (Meteor.isServer) {
  Questions.allow({
    insert: function(userId, doc) {
      return true;
    },

    update: function(userId, doc, fieldNames, modifier) {
      return true;
    },

    remove: function(userId, doc) {
      return true;
    }
  });

  // Questions.deny({
  //   insert: function (userId, doc) {
  //     return true;
  //   },
  //
  //   update: function (userId, doc, fieldNames, modifier) {
  //     return true;
  //   },
  //
  //   remove: function (userId, doc) {
  //     return true;
  //   }
  // });
}

Questions.helpers({
  upvote: function(userId) {
    var questionId = this._id;
    var vote = Votes.findOne({questionId: questionId, userId: userId});
    if (!vote) {
      Votes.insert({
        questionId: questionId,
        createdAt: new Date(),
        userId: userId
      });
      Questions.update({_id: questionId}, {$inc: {votes:1}});
    }
  },

  downvote: function(userId) {
    var questionId = this._id;
    var vote = Votes.findOne({questionId: questionId, userId: userId});
    if (vote) {
      Votes.remove(vote._id);
      Questions.update({_id: questionId}, {$inc: {votes:-1}});
    }
  }
});
