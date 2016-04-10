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
      console.log('triggered-----------------------');
      Router.go('/', {});
      return false;
    }
    return true;
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
