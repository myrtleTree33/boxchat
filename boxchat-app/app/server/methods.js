/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/

Meteor.methods({
  'server/method_name': function() {
    // server method logic
  },

  'server/verify/generateHash': function(userId) {
    var config = Meteor.settings;
    var salt = config.verify.salt;
    var date = Date.now();
    var raw = config + salt + date;
    return sha1(raw);
  },

  'signup/sendVerificationEmail': function() {
    console.log('sending email to: ' + Meteor.userId());
    try {
      Accounts.sendVerificationEmail(Meteor.userId());
    } catch (e) {
      console.error(e);
    }
  },

  'signup/addEmail': function(email) {
    Accounts.addEmail(Meteor.userId(), email);
  },

  'forum/createForumFormValidify': function(formData, captchaData) {

    var verifyCaptchaResponse = reCAPTCHA.verifyCaptcha(this.connection.clientAddress, captchaData);

    if (!verifyCaptchaResponse.success) {
      console.log('reCAPTCHA check failed!', verifyCaptchaResponse);
      throw new Meteor.Error(422, 'reCAPTCHA Failed: ' + verifyCaptchaResponse.error);

    } else
      console.log('reCAPTCHA verification passed!');
    var forumId = Forums.insert(formData);

    // add roles to users
    Meteor.call('userPermissions/addForum', formData.all, ['all'], forumId);
    Meteor.call('userPermissions/addForum', formData.admin, ['admin'], forumId);

    return forumId;
  }

});
