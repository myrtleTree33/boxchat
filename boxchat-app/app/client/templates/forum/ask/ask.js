/*****************************************************************************/
/* Ask: Event Handlers */
/*****************************************************************************/
Template.Ask.events({
  'input #qn-content': function(event, template) {
    template.input.set($('#qn-content').val());
  },
  'submit #form-ask': function(event) {
    event.preventDefault();
    var obj = event.target;
    var title = obj.title.value;
    var content = obj.content.value;
    var tags = obj.topics.value.split(/[ ,]+/).filter(Boolean);
    var forumId = Router.current().params.forumId;

    var escapeTags = function(tags) {
      var output = [];
      for (var i = 0; i < tags.length; i++) {
        var t = tags[i];

        if (t.charAt(0) !== '#') {
          t = '#' + t;
        }
        output.push(t);
      }
      return output;
    }
    tags = escapeTags(tags); // properly format hashtag

    _(tags).each(function(tag) {
      var existingTags = Tags.find({
        tag: tag,
        forumId: forumId
      }).fetch();
      if (existingTags.length === 0) { // unique tag
        Tags.insert({
          tag: tag,
          forumId: forumId
        });
      }
    })

    var formData = {
      forumId: forumId,
      title: title,
      content: content,
      votes: 0,
      views: 0,
      tags: tags
    };

    Meteor.call('forum/createQuestion', formData, function(err) {
      if (err) {
        return Bert.alert('Oops, error creating question: ' + err, 'warning', 'growl-top-right');
      }
      Bert.alert('Question successfully posted!', 'success', 'growl-top-right');
      Router.go('forum', {
        id: forumId
      });
    });

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
