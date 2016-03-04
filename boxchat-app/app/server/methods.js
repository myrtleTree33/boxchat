/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/

Meteor.methods({
  'server/method_name': function () {
    // server method logic
  },

  'signup/sendVerificationEmail': function() {
    var userId = Meteor.userId();
    console.log('---------------')
    console.log(userId);
    console.log('---------------')
    if (userId) {
      return Accounts.sendVerificationEmail(userId);
    }
  }
});
