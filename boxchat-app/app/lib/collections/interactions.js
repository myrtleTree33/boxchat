Interactions = new Mongo.Collection('interactions');


if (Meteor.isServer) {
  Interactions.allow({
    insert: function (userId, doc) {
      return true;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },

    remove: function (userId, doc) {
      return true;
    }
  });

  // Interactions.deny({
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


Interactions.helpers({
  upvote: function(userId) {
    var interactionId = this._id;
    var vote = Votes.findOne({interactionId: interactionId, userId: userId});
    if (!vote) {
      Votes.insert({
        interactionId: interactionId,
        createdAt: new Date(),
        userId: userId
      });
      Interactions.update({_id: interactionId}, {$inc: {votes:1}});
    }
  },

  downvote: function(userId) {
    var interactionId = this._id;
    var vote = Votes.findOne({interactionId: interactionId, userId: userId});
    if (vote) {
      Votes.remove(vote._id);
      Interactions.update({_id: interactionId}, {$inc: {votes:-1}});
    }
  }
});
