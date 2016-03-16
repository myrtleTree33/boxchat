/*****************************************************************************/
/* Search: Event Handlers */
/*****************************************************************************/
Template.Search.events({});

/*****************************************************************************/
/* Search: Helpers */
/*****************************************************************************/
Template.Search.helpers({});

/*****************************************************************************/
/* Search: Lifecycle Hooks */
/*****************************************************************************/
Template.Search.onCreated(function() {
});

Template.Search.onRendered(function() {
  $('#input-tags').selectize({
    delimiter: ',',
    persist: false,
    create: function(input) {
      return {
        value: input,
        text: input
      }
    }
  });
});

Template.Search.onDestroyed(function() {});
