/*****************************************************************************/
/* SettingForums: Event Handlers */
/*****************************************************************************/
Template.SettingForums.events({});

/*****************************************************************************/
/* SettingForums: Helpers */
/*****************************************************************************/
Template.SettingForums.helpers({
    forumNum: function() {
        var length = Forums.find({
            all: Meteor.user()._id
        }).count();
        return length > 0 ? length : false;
    },



    forums: function() {
        return Forums.find({
            all: Meteor.user()._id
        }, {
            sort: {
                createdAt: -1
            }
        });
    }
});

/*****************************************************************************/
/* SettingForums: Lifecycle Hooks */
/*****************************************************************************/
Template.SettingForums.onCreated(function() {});

Template.SettingForums.onRendered(function() {});

Template.SettingForums.onDestroyed(function() {});
