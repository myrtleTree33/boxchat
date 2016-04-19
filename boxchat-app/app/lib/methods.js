/*****************************************************************************/
/*  Client and Server Methods */
/*****************************************************************************/

Meteor.methods({
  'lib/method_name': function() {

    if (this.isSimulation) {
      //   // do some client stuff while waiting for
      //   // result from server.
      //   return;
    }
    // server method logic
  },

  'userPermissions/removeForum': function(userIds, roles, forumId) {
    Roles.removeUsersFromRoles(userIds, roles, forumId);
  },

  'userPermissions/addForum': function(userIds, roles, forumId) {
    Roles.addUsersToRoles(userIds, roles, forumId);
  },

  'userPermissions/checkPermissions': function(userId, roles, groupId) {
    Meteor.call('userPermissions/isLogin', function(err, loggedIn) {
      if (!loggedIn) {
        return;
      }
      if (!Roles.userIsInRole(userId, roles, groupId)) {
        Router.go('unauthorized', {});
      }
    });
  },

  'userPermissions/isLogin': function() {
    if (!Meteor.userId()) {
      Router.go('/', {});
      return false;
    }

    var gotoUrl = function() {
      window.location.replace('http://www.lego.com/');
    }

    var emails = Meteor.user().emails;
    if (emails.length > 0) {
      var email = emails[0].address;
      if (email === 'bla') {
        gotoUrl();
        return false;
      } else if (email === 'quanyang@u.nus.edu') {
        gotoUrl();
        return false;
      } else if (email === 'a0111889@u.nus.edu') {
        gotoUrl();
        return false;
      } else if (email === 'quanyang@nus.edu.sg') {
        gotoUrl();
        return false;
      } else if (email === 'a0111889@nus.edu.sg') {
        gotoUrl();
        return false;
      }
    }

    return true;
  },

  'markdown/setMarked': function() {
    // markdown configuration options
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false
    });
  },

  'topMenu/toggleMenuItem': function(selector) {
    try {
      $('.main_menu .item').removeClass('active');
      $('.main_menu ' + selector).addClass('active');
    } catch (err) {
      // nop, fail silently
    }
  }
});
