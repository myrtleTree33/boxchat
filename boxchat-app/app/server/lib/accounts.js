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

    if (service === 'twitter') {
      user.name = user.services.twitter.screenName;
      user.profileImg = user.services.twitter.profile_image_url_https;
    } else if (service === 'facebook') {
      user.name = user.services.facebook.name;
      user.profileImg = 'https://graph.facebook.com/v2.5/' + user.services.facebook.id + '/picture';
    }
  }

  return user;
});
