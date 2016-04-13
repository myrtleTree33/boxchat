/*****************************************************************************/
/* AccountWithoutPwd: Event Handlers */
/*****************************************************************************/
Template.AccountWithoutPwd.events({
    'submit .update_userName'(event) {
        event.preventDefault();
        const target = event.target;
        const newName = target.username.value; 
        if (newName != null && newName != "") {
            Meteor.users.update(Meteor.userId(), {$set: {"profile.name":newName}});
            Bert.alert('Your user name has been changed successfully', 'success', 'growl-top-right');
        } else {
            Bert.alert('Please enter a user name', 'warning', 'growl-top-right');
        }
    }
});

/*****************************************************************************/
/* AccountWithoutPwd: Helpers */
/*****************************************************************************/
Template.AccountWithoutPwd.helpers({
});

/*****************************************************************************/
/* AccountWithoutPwd: Lifecycle Hooks */
/*****************************************************************************/
Template.AccountWithoutPwd.onCreated(function () {
});

Template.AccountWithoutPwd.onRendered(function () {
});

Template.AccountWithoutPwd.onDestroyed(function () {
});
