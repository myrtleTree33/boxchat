Meteor.startup(function() {
  // load the config file
  var config = JSON.parse(Assets.getText('config.private.json'));

  // sendGrid
  process.env.MAIL_URL = config.sendGrid.MAIL_URL;


  ServiceConfiguration.configurations.remove({
    service: 'facebook'
  });

  ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: config.facebook.APP_ID,
    secret: config.facebook.SECRET
  });

  ServiceConfiguration.configurations.remove({
    service: 'twitter'
  });

  ServiceConfiguration.configurations.insert({
    service: 'twitter',
    consumerKey: config.twitter.CONSUMER_KEY,
    secret: config.twitter.SECRET
  });

});
