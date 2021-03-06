/*****************************************************************************/
/*  Client and Server Methods */
/*****************************************************************************/

Meteor.methods({
  'lib/method_name': function() {

    if (this.isSimulation) {
      //   // do some client stuff while waiting for
      //   // result from server.
      //   return;
    }
    // server method logic
  },

  'analytics/getUserContrib': function(forumId) {
    var output = [];
    var all = Forums.findOne({_id: forumId}).all;
    for (var i = 0; i < all.length; i++) {
      var user = {};
      var userId = all[i];
      var questions = Questions.find({
        forumId: forumId,
        authorId: userId,
      }).count();

      var likes = 0;
      Questions.find({
        forumId: forumId,
        authorId: userId
      }).fetch().map(function(q) {
        likes += q.votes;
      });

      var interactions = Interactions.find({
        forumId: forumId,
        authorId: userId,
      }).count();

      output.push({
        userId: userId,
        questions: questions,
        interactions: interactions,
        likes: likes
      });

    }
    return output;
  }

});
