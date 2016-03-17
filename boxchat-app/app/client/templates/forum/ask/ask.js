/*****************************************************************************/
/* Ask: Event Handlers */
/*****************************************************************************/
Template.Ask.events({
  'input #qn-content': function(event, template) {
    template.input.set($('#qn-content').val());
    // console.log($('#qn-content').val());
    // console.log(template.input.get());
  }
});

/*****************************************************************************/
/* Ask: Helpers */
/*****************************************************************************/
Template.Ask.helpers({
  qnContent: function() {
    return {
      'text': Template.instance().input.get()
    }
  }
});

/*****************************************************************************/
/* Ask: Lifecycle Hooks */
/*****************************************************************************/
Template.Ask.onCreated(function() {
  this.input = new ReactiveVar('');
});

Template.Ask.onRendered(function() {});

Template.Ask.onDestroyed(function() {});
