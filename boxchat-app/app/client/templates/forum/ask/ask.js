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
    var tags = obj.topics.value.split(',');
    var forumId = Router.current().params.forumId;

    _(tags).each(function(_tag) {
      var tag = _tag;
      if (_tag.charAt(0) !== '#') {
        tag = '#' + _tag;
      }
      var existingTags = Tags.find({tag: tag, forumId: forumId}).fetch();
      if (existingTags.length === 0) { // unique tag
        Tags.insert({
          tag: tag,
          forumId: forumId
        });
      }
    })

    Questions.insert({
      authorId: Meteor.user()._id,
      createdAt: new Date(),
      forumId: forumId,
      title: title,
      content: content,
      votes: 0,
      views: 0,
      tags: tags
    }, function(err, result) {
      if (err) {
        Bert.alert('Oops, something went wrong', 'danger');
        return;
      }
      Bert.alert('Question successfully posted!', 'success');
      Router.go('forum', {id: forumId});
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
