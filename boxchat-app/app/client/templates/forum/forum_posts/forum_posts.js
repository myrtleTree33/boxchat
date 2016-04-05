/*****************************************************************************/
/* ForumPosts: Event Handlers */
/*****************************************************************************/
Template.ForumPosts.events({
    'click .title': function(event, template) {
        event.preventDefault();
        Router.go('question', {id: template.data._id});
    }
});

/*****************************************************************************/
/* ForumPosts: Helpers */
/*****************************************************************************/
Template.ForumPosts.helpers({
    creationTime: function() {
        var time = Template.instance().data.createdAt;
        var date = new Date(time);
        var day = ("0" + date.getDate()).slice(-2);
        var month = ("0" + date.getMonth()).slice(-2);
        var hour = ("0" + date.getHours()).slice(-2);
        var minute = ("0" + date.getMinutes()).slice(-2);
        var creation = day + "-" + month + " " + hour + ":" + minute;
        return creation;
    },
    
    authorName: function() {
        var author = Meteor.users.findOne({_id: Template.instance().data.authorId});
        return author.profile.name;
    }
});

/*****************************************************************************/
/* ForumPosts: Lifecycle Hooks */
/*****************************************************************************/
Template.ForumPosts.onCreated(function () {
});

Template.ForumPosts.onRendered(function () {
});

Template.ForumPosts.onDestroyed(function () {
});
