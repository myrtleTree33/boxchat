Meteor.startup(function() {
  // load the config file
  var config = Meteor.settings;

  // sendGrid
  process.env.MAIL_URL = config.sendGrid.MAIL_URL;
  console.log(process.env.MAIL_URL);


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

  reCAPTCHA.config({
    privatekey: config.recaptcha.PRIVATE_KEY
  });


  // Add in correct MongoDB
  var improvementForums = Forums.findOne({
    title: 'Improvements forum'
  });

  if (!improvementForums) {
    Forums.insert({
      title: 'Improvements forum',
      description: 'This is the improvements forum.  Feel free to try out NUS Answers in this forum, post your help questions, or simply suggest changes for NUS Forum.',
      tags: ['#public', '#nusforum', '#nus', '#improvements']
    });
  }




});
