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
    title: Meteor.settings.public['default_public_forum_name']
  });

  if (!improvementForums) {
    Forums.insert({
      title: Meteor.settings.public['default_public_forum_name'],
      description: 'This is the improvements forum.  Feel free to try out NUS Answers in this forum, post your help questions, or simply suggest changes for NUS Forum.',
      tags: ['#public', '#nusforum', '#nus', '#improvements']
    });
  }


  // cron jobs below ------------------------------------------
  // cron job to purge unverified users from system
  // http://stackoverflow.com/questions/27009512/remove-unverified-meteor-users-after-certain-time-period
  SyncedCron.add({
    name: 'Remove unverified users',
    schedule: function(parser) {
      // parser is a later.parse object
      return parser.text('every day at 12am');
    },
    job: function() {

      var removeUnverifiedUsers = function() {
        console.log('CRON: Removing unverified users..');
        Meteor.users.remove({
          'emails.0.verified': false
        });
      };

      var numUsersRemoved = removeUnverifiedUsers();
      return numUsersRemoved;
    }
  });

  // start the cron daemon
  SyncedCron.start();

  if (Meteor.isClient) {
    return SEO.config({
      title: 'NUS Forum: Better IVLE forums for NUS students.',
      meta: {
        'description': 'Better IVLE forums for NUS students and instructors.',
        'keywords': 'NUS, IVLE Forum, NUS Forum, National University of Singapore, Engineering, Year 1, Year 2, Year 3, Year 4, NUS Forum, better NUS Forum, School of Computing, SoC'
      },
      og: {
        'image': 'http://nusforum.com/boxchat-app/app/public/img/logo/logo.png'
      }
    });
  }

  SeoCollection.update({
    route_name: 'home'
  }, {
    $set: {
      route_name: 'home',
      title: 'NUS Forum: Home | Better IVLE forums for NUS students',
      meta: {
        'description': 'Better IVLE forums for NUS students and instructors.'
      },
      og: {
        'title': 'NUS Forum | Home page',
        'image': 'http://nusforum.com/boxchat-app/app/public/img/logo/logo.png'
      }
    }
  }, {
    upsert: true
  });

});
