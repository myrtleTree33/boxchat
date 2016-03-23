Accounts.onCreateUser(function(options, user) {
  if (user.services) {
    var service = _.keys(user.services)[0]; // get service type

    // merge accounts if exists
    // var email = user.services[service].email;
    // var existingUser = Meteor.users.findOne({
    //   'emails.address': email
    // });
    // if (existingUser) {
    //   existingUser.services = existingUser.services ? existingUser.services : {};
    //   existingUser.services[service] = user.services[service];
    //   return existingUser;
    // }

    // else if new user, standardize name fields etc.

    user.profile = user.profile || {};
    user.profile['currForum'] = undefined;
    user.profile['emails'] = [];

    if (service === 'twitter') {
      user.profile['name'] = user.services.twitter.screenName;
      user.profile['profileImg'] = user.services.twitter.profile_image_url_https;

    } else if (service === 'facebook') {
      user.profile['name'] = user.services.facebook.name;
      user.profile['emails'].push({
        email: user.services.facebook.email,
        verified: true
      });
      user.profile['profileImg'] = 'https://graph.facebook.com/v2.5/' + user.services.facebook.id + '/picture';

    } else if (service === 'password') {
      user.profile['name'] = user.emails[0].address;
      user.profile['emails'].push({
        email: user.emails[0].address,
        verified: true
      });
      user.profile['profileImg'] = undefined; //TODO fill in
    }
  }

  return user;
});
