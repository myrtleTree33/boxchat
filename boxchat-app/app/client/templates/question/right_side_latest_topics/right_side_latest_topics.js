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
