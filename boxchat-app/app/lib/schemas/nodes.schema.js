var Schemas = Schemas || {};

Schemas.Nodes = new SimpleSchema({
  type: {
    type: String,
    label: 'Type',
    max: 20
  },
  text: {
    type: String,
    label: 'Text, in Markdown'
  },
  authorId: {
    type: String,
    max: 50,
    label: 'The author ID'
  },
  viewedUserIds: {
    type: Array,
    label: 'Users who have viewed the post'
  },
  'viewedUserIds.$': {
    type: String
  },
  commentIds: {
    type: Array,
    label: 'Comments linked to this question.'
  },
  'commentIds.$': {
    type: String
  },
  interactionIds: {
    type: Array,
    label: 'Interactions linked to this question'
  },
  'interactionIds.$': {
    type: String
  },
  lastEdited: {
    type: Number,
    label: 'UNIX timestamp in milliseconds since node was last edited'
  },
  createdAt: {
    type: Number,
    label: 'UNIX timestamp in milliseconds since node was created'
  },
  votes: {
    type: Number,
    min: 0,
    label: 'Number of votes for the node'
  }
});

Nodes.attachSchema(Schemas.Nodes);
