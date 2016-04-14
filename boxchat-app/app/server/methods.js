/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/

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
    // remove all older emails
    var existingEmails = Meteor.user().emails;
    if (existingEmails) {
      for (var i = 0; i < existingEmails.length; i++) {
        Accounts.removeEmail(Meteor.userId(), existingEmails[i].address);
      }
    }

    if (!isNusEmail(email)) {
      throw new Meteor.Error(422, 'Invalid email');
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
    } else if (formData.description.length < 20) {
    }

    if (!formData.tags || formData.tags.length < 3) {
      throw new Meteor.Error(422, 'Please use at least 3 tags to describe the forum.');
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
  }

});
