/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/

// email validator from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
function isEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

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

  'signup/addPendingForums': function(userId) {

    // get the email
    var email = Meteor.user().emails[0].address;

    var pendingUser = PendingUsers.findOne({
      email: email
    });
    if (!pendingUser) return;
    if (pendingUser.length === 0) return;

    var forumIds = pendingUser.forumIds;

    // then add user to forums
    for (var i = 0; i < forumIds.length; i++) {
      var forumId = forumIds[i]
      Forums.update(forumId, {
        $addToSet: {
          all: userId
        }
      });
      // give user appropriate permissions per forum
      Meteor.call('userPermissions/addForum', [userId], ['all'], forumId);
    }
  },

  'forum/createForumFindUsers': function(query, limit) {

    var _query = {
      '$or': [{
        'profile.name': {
          $regex: '.*' + query + '.*',
          $options: 'i'
        }
      }, {
        'emails.address': {
          $regex: '.*' + query + '.*',
          $options: 'i'
        }
      }]
    };

    var _formatting = {
      limit: limit,
      _id: 1,
      profile: 1,
      emails: 0
    };

    return Meteor.users.find(_query, _formatting).fetch();
  },

  'forum/createForumFormValidify': function(formData, captchaData) {

    var verifyCaptchaResponse = reCAPTCHA.verifyCaptcha(this.connection.clientAddress, captchaData);

    if (!verifyCaptchaResponse.success) {
      console.log('reCAPTCHA check failed!', verifyCaptchaResponse);
      throw new Meteor.Error(422, 'reCAPTCHA Failed: ' + verifyCaptchaResponse.error);

    } else {
      console.log('reCAPTCHA verification passed!');
    }

    var forumId = Forums.insert(formData);

    // get rid of all invalid users, and replace
    // email ones by ID

    for (var i = 0; i < formData.all.length; i++) {
      var entry = formData.all[i];

      if (isEmail(entry)) {
        var user = Meteor.users.findOne({
          'emails.address': entry
        });
        if (user) {
          formData.all[i] = user._id;
        } else {
          PendingUsers.upsert({
            email: entry
          }, {
            $addToSet: {
              forumIds: forumId
            }
          });
          formData.all[i] = null;
        }
      }
    }

    // remove all undefined ids, and duplciates from set
    formData.all = lodash.compact(lodash.union(formData.all));

    // add roles to users
    Meteor.call('userPermissions/addForum', formData.all, ['all'], forumId);
    Meteor.call('userPermissions/addForum', formData.admin, ['admin'], forumId);

    return forumId;
  }

});
