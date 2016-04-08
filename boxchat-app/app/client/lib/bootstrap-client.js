Meteor.startup(function() {
  var config = Meteor.settings.public;
    reCAPTCHA.config({
        publickey: config.recaptcha.PUBLIC_KEY,
        hl: 'en' // optional display language
    });
});
