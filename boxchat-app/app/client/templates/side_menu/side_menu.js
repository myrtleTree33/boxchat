/*****************************************************************************/
/* SideMenu: Event Handlers */
/*****************************************************************************/
Template.SideMenu.events({
    'click #currentForum': function(event) {
        var forumId = Meteor.user().profile.currForum;
        if (forumId) {
        Router.go('forum', {
            id: forumId
        });
    } else { // handle case for new user
      Router.go('/profile');
    }
    },
    
    'click #profile': function(event) {
        Router.go('/profile');
    },
    
    'click #forums': function() {
    }
});

/*****************************************************************************/
/* SideMenu: Helpers */
/*****************************************************************************/
Template.SideMenu.helpers({
    currentForum: function() {
        var forumId = Meteor.user().profile.currForum;
        var title = Forums.findOne({_id: forumId}).title;
        console.log(title);
        return title;
    }
});

/*****************************************************************************/
/* SideMenu: Lifecycle Hooks */
/*****************************************************************************/
Template.SideMenu.onCreated(function () {
});

Template.SideMenu.onRendered(function () {
});

Template.SideMenu.onDestroyed(function () {
});
