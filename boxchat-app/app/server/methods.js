/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/

var getModulesSync = function(cb) {
  var lapi = Meteor.settings.public.lapi;
  var token = Meteor.user().profile.lapiToken;
  var query = lapi.apiDomain + lapi.apiUrl + "Modules?APIKey=" + lapi.apiKey + "&AuthToken=" + token + "&Duration=1&IncludeAllInfo=false&output=json&callback=?";
  HTTP.get(query, function(err, res) {
    var obj = JSON.parse(res.content.substring(2, res.content.length - 2)).Results;
    var mods = lodash.map(obj, function(module) {
      return {
        ID: module.ID,
        CourseCode: module.CourseCode
      }
    });
    return cb(null, mods);
  });
};

// email validator from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
function isEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function isNusEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((u.nus.edu)|(nus.edu.sg))$/;
  return re.test(email);
}

Meteor.methods({
  'server/method_name': function() {
    // server method logic
  },

  'server/userSettings/updateUsername': function(name) {
    Meteor.users.update(Meteor.userId(), {
      $set: {
        'profile.name': name
      }
    });
  },

  'server/userSettings/updatePassword': function(name) {

  },

  'server/verify/generateHash': function(userId) {
    var config = Meteor.settings;
    var salt = config.verify.salt;
    var date = Date.now();
    var raw = config + salt + date;
    return sha1(raw);
  },

  'signup/sendVerificationEmail': function() {
    // console.log('sending email to: ' + Meteor.userId());
    try {
      Accounts.sendVerificationEmail(Meteor.userId());
    } catch (e) {
      console.error(e);
    }
  },

  'signup/createNewPasswordUser': function(email, password, name) {
    var user = {
      email: email,
      password: password,
      name: name
    };
    if (!isNusEmail(email)) {
      throw new Meteor.Error(422, 'Please use a valid NUS email');
    }
  },

  'signup/addEmail': function(email) {

    // get unverified emails of all users younger than 5 days
    var newUsersWithExistingEmail = Meteor.users.find({
      'emails.address': email,
    }).count();

    // if new users have pending invites with same email, do not allow
    if (newUsersWithExistingEmail > 0) {
      throw new Meteor.Error(422, 'Unable to change email, existing user with email in use.');
    }

    // remove all older emails
    var existingEmails = Meteor.user().emails;
    if (existingEmails) {
      for (var i = 0; i < existingEmails.length; i++) {
        Accounts.removeEmail(Meteor.userId(), existingEmails[i].address);
      }
    }

    // remove all unverified emails in use older than one day
    // var userIdsWithExistingEmail = lodash.map(Meteor.users.find({
    //   'emails.address': email,
    //   'emails.verified': false,
    //   'services.email.verificationTokens.when': {
    //     $lt: moment().subtract(5, 'days').toDate()
    //   }
    // }).fetch(), '_id');
    //
    // lodash.each(userIdsWithExistingEmail, function(id) {
    //   Accounts.removeEmail(id, email);
    // });


    if (!isNusEmail(email)) {
      throw new Meteor.Error(422, 'Invalid email, please use your NUS email.');
    }
    Accounts.addEmail(Meteor.userId(), email);
  },

  'signup/addPendingForums': function(userId) {

    // get the email
    var email = Meteor.user().emails[0].address;

    var pendingUser = PendingUsers.findOne({
      email: email
    });
    if (!pendingUser) return;
    // if (pendingUser.length === 0) return;

    var forumIds = pendingUser.forumIds;

    // then add user to forums
    for (var i = 0; i < forumIds.length; i++) {
      var forumId = forumIds[i]
      Forums.update(forumId, {
        $addToSet: {
          all: userId,
          students: userId
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

  'forum/createQuestion': function(formData) {

    if (!formData.forumId) {
      throw new Meteor.Error(422, 'Invalid forum ID');
    }
    if (!formData.title || formData.title === '') {
      throw new Meteor.Error(422, 'Please specify a title.');
    }
    if (formData.title.length < 10) {
      throw new Meteor.Error(422, 'Please specify a longer question.');
    }
    if (!formData.content || formData.content.length < 20) {
      throw new Meteor.Error(422, 'Please add details to your question');
    }
    if (!formData.tags || formData.tags.length < 2) {
      throw new Meteor.Error(422, 'Please add a minimum of two tags to your question.');
    }
    if (formData.tags.length > 5) {
      throw new Meteor.Error(422, 'Please limit the number of tags to 5.');
    }

    Questions.insert({
      authorId: Meteor.userId(),
      createdAt: new Date(),
      forumId: formData.forumId,
      title: formData.title,
      content: formData.content,
      votes: 0,
      views: 0,
      tags: formData.tags
    });

  },

  'forum/createForumFormValidify': function(formData, captchaData) {

    var verifyCaptchaResponse = reCAPTCHA.verifyCaptcha(this.connection.clientAddress, captchaData);

    if (!verifyCaptchaResponse.success) {
      throw new Meteor.Error(422, 'reCAPTCHA Failed: ' + verifyCaptchaResponse.error);

    } else {
      // recaptcha check passed
    }

    if (!formData.title) {
      throw new Meteor.Error(422, 'Invalid title');
    } else if (formData.title.length < 5) {
      throw new Meteor.Error(422, 'Title must be at least 5 characters long.');
    } else if (formData.title === Meteor.settings.public['default_public_forum_name']) {
      throw new Meteor.Error(422, 'Invalid name, please use a different name.');
    }

    if (!formData.description) {
      throw new Meteor.Error(422, 'Invalid description');
    } else if (formData.description.length < 20) {}

    if (!formData.tags || formData.tags.length < 3) {
      throw new Meteor.Error(422, 'Please use at least 3 tags to describe the forum.');
    }

    var students = [];
    for (var i = 0; i < formData.students.length; i++) {
      var curr = formData.students[i];
      if (!isEmail(curr)) {
        students.push(curr);
      }
    }

    var forumId = Forums.insert(formData);

    // get rid of all invalid users, and replace
    // email ones by ID

    var allUsersWithId = [];

    for (var i = 0; i < formData.all.length; i++) {
      var entry = formData.all[i];

      if (isEmail(entry)) {
        var user = Meteor.users.findOne({
          'emails.address': entry,
          'emails.verified': true,
        });
        // if email associated with verified user ID then
        if (user) {
          allUsersWithId.push(user._id);
          // no such user as yet, or not verified
        } else {

          PendingUsers.upsert({
            email: entry
          }, {
            $addToSet: {
              forumIds: forumId
            }
          });

          Email.send({
            to: entry,
            from: 'no-reply@nusforum.com',
            subject: 'NUS Forum Notifications: You\'ve been added to a new forum: ' + formData.title,
            html: 'Hello there, <br><br> You have been added to a new forum on NUS Forum.  To register for a new account and view this forum, please visit <a href="http://www.nusforum.com">http://www.nusforum.com</a>.  Thank you.<br><br>Warm regards,<br>NUS Forum'
          });

        }
        // if valid id then
      } else {
        allUsersWithId.push(entry);
      }
    }

    // remove all undefined ids, and duplciates from set
    allUsersWithId = lodash.compact(lodash.union(allUsersWithId));

    // add roles to users
    Meteor.call('userPermissions/addForum', allUsersWithId, ['all'], forumId);
    Meteor.call('userPermissions/addForum', formData.admin, ['admin'], forumId);

    Forums.update(forumId, {
      $set: {
        'all': allUsersWithId,
        'students': students
      }
    });

    return forumId;
  },

  'signup/addUserToImprovementsForum': function() {
    var forumId = Forums.findOne({
      title: Meteor.settings.public['default_public_forum_name']
    })._id;

    Forums.update({
      _id: forumId
    }, {
      $addToSet: {
        all: Meteor.userId()
      }
    });

    // add user to forum
    // add roles to users
    Meteor.call('userPermissions/addForum', [Meteor.userId()], ['all'], forumId);
  },

  'analytics/getUserContrib': function(forumId) {
    var output = [];
    var all = Forums.findOne({
      _id: forumId
    }).all;
    for (var i = 0; i < all.length; i++) {
      var user = {};
      var userId = all[i];
      var questions = Questions.find({
        forumId: forumId,
        authorId: userId,
      }).count();

      var likes = 0;
      Questions.find({
        forumId: forumId,
        authorId: userId
      }).fetch().map(function(q) {
        likes += q.votes;
      });

      var interactions = Interactions.find({
        forumId: forumId,
        authorId: userId,
      }).count();

      var name = Meteor.users.findOne(userId).profile.name;

      output.push({
        name: name,
        questions: questions,
        interactions: interactions,
        likes: likes
      });

    }
    return output;
  },

  'interaction/create': function(formData) {

    if (!formData.questionId || !formData.forumId) {
      throw new Meteor.Error(422, 'Invalid Question of Forum specified');
    }
    if (!formData.content || formData.content.length < 15) {
      throw new Meteor.Error(422, 'Please specify a longer sentence.');
    }

    Interactions.insert({
      authorId: Meteor.userId(),
      createdAt: new Date(),
      questionId: formData.questionId,
      forumId: formData.forumId,
      content: formData.content,
      votes: 0
    }, function(err, result) {
      if (err) {
        throw new Meteor.Error(422, 'DB Issue');
      }
    });
  },

  'lapi/addAuthToken': function(token) {
    Meteor.users.update(Meteor.userId(), {
      $set: {
        'profile.lapiToken': token
      }
    });
  },

  'lapi/getClassModules': function() {
    return Meteor.wrapAsync(getModulesSync)();
  },

  'lapi/isUp': function() {
    var getAliveSync = function(cb) {
      var lapi = Meteor.settings.public.lapi;
      var token = Meteor.user().profile.lapiToken;
      if (!token) {
        return cb(null, false);
      }
      // get class roster
      var query = lapi.apiDomain + lapi.apiUrl + "UserName_Get?output=json&callback=?&APIKey=" + lapi.apiKey + "&Token=" + token;
      HTTP.get(query, function(err, res) {
        if (err) {
          return cb(null, false); // lapi server err
        }
        if (res.content === '_(\"\");') {
          return cb(null, false); // invalid token, should request new one
        }
        return cb(null, true);
      });
    };

    return Meteor.wrapAsync(getAliveSync)();

  },

  'lapi/getClassRosterByModule': function(module) {
    var getRosterSync = function(cb) {
      var modules = Meteor.wrapAsync(getModulesSync)();
      var moduleIdIdx = lodash.findIndex(modules, ['CourseCode', module]);
      var moduleId = modules[moduleIdIdx].ID;
      var lapi = Meteor.settings.public.lapi;
      var token = Meteor.user().profile.lapiToken;
      // get class roster
      var query = lapi.apiDomain + lapi.apiUrl + "Class_Roster?APIKey=" + lapi.apiKey + "&AuthToken=" + token + "&CourseID=" + moduleId + "&output=json&callback=?";
      HTTP.get(query, function(err, res) {
        var obj = JSON.parse(res.content.substring(2, res.content.length - 2)).Results;
        console.log(obj)
        var users = lodash.map(obj, function(user) {
          return {
            userId: user.UserID + '@u.nus.edu'
          };
        });
        cb(null, users);
      });
    };

    return Meteor.wrapAsync(getRosterSync)();
  }


});
