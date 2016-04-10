Accounts.emailTemplates.siteName = 'NUS Forum';
// Accounts.emailTemplates.from = "NUS Forum <no-reply@nusforum.com";
//
// Accounts.emailTemplates.verifyEmail = {
//   subject: function() {
//     return 'Verify your email address'
//   },
//   text: function(user, url) {
//     var emailAddress = user.emails[0].address,
//     url = '',
//     supportEmail = '',
//     emailBody = '';
//
//     return emailBody;
//   }
// }

// from S/O answer http://stackoverflow.com/questions/21059880/meteor-questions-about-verification-email on tweaking accounts custom email
Accounts.emailTemplates.verifyEmail = {
  subject: function(user) {
    return "How to verify email address on " + Accounts.emailTemplates.siteName;
  },
  text: function(user, url) {

    url = url.replace('/#', '');

    var greeting = (user.profile && user.profile.name) ?
      ("Hello " + user.profile.name + ",") : "Hello,";
    return greeting + "\n" + "\n" + "To verify your account email, simply click the link below.\n" + "\n" + url + "\n" + "\n" + "Thanks.\n";
  }
}
