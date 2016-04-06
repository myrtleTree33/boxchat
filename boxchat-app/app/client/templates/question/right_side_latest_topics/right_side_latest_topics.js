/*****************************************************************************/
/* RightSideLatestTopics: Event Handlers */
/*****************************************************************************/
Template.RightSideLatestTopics.events({
    'click .title': function(event, template) {
        event.preventDefault();
        Router.go('question', {id: template.data._id});
    }
});

/*****************************************************************************/
/* RightSideLatestTopics: Helpers */
/*****************************************************************************/
Template.RightSideLatestTopics.helpers({
    author: function() {
        var author = Meteor.users.findOne({_id: Template.instance().data.authorId});
        return author.profile.name;
    }
});

/*****************************************************************************/
/* RightSideLatestTopics: Lifecycle Hooks */
/*****************************************************************************/
Template.RightSideLatestTopics.onCreated(function () {
});

Template.RightSideLatestTopics.onRendered(function () {
});

Template.RightSideLatestTopics.onDestroyed(function () {
});
