Template.MasterLayout.helpers({
  hasEmail: function() {
    if (!('emails' in Meteor.user()) ) {
      return false;
    }

    // success
    return true;
  }
});

Template.MasterLayout.events({
});

Template.Ask.onRendered(function() {
  // markdown configuration options
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false
    });


});
