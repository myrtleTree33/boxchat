Forums = new Mongo.Collection('forums');


if (Meteor.isServer) {
  Forums.allow({
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

  // Forums.deny({
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
