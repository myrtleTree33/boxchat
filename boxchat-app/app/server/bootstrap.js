Meteor.startup(function() {
  // load the config file
  var config = JSON.parse(Assets.getText('config.private.json'));

  // sendGrid
  process.env.MAIL_URL = config.sendGrid.MAIL_URL;

});
