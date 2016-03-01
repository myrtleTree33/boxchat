/*****************************************************************************/
/* Task: Event Handlers */
/*****************************************************************************/
Template.Task.events({
  'click .toggle-checked': function() {
    Task.update(this._id, {
      $set: {
        checked: !this.checked
      }
    });
  },
  'click .delete': function() {
    Task.remove(this._id);
  }
});

/*****************************************************************************/
/* Task: Helpers */
/*****************************************************************************/
Template.Task.helpers({
});

/*****************************************************************************/
/* Task: Lifecycle Hooks */
/*****************************************************************************/
Template.Task.onCreated(function () {
});

Template.Task.onRendered(function () {
});

Template.Task.onDestroyed(function () {
});
