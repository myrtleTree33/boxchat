/*****************************************************************************/
/* TopUsers: Event Handlers */
/*****************************************************************************/
Template.TopUsers.events({
});

/*****************************************************************************/
/* TopUsers: Helpers */
/*****************************************************************************/
Template.TopUsers.helpers({
    img: function() {
      var user = Meteor.users.findOne({
          _id: Template.instance().data[0]
      });
      var img = user.profile.profileImg;
      if (img == null) {
          img = "/img/default.jpg";
      }
      return img;
    },
    
    color: function() {
        var rank = Template.instance().data[1];
        if (rank == 1) {
            return "red";
        } else if (rank == 2) {
            return "orange";
        } else if (rank == 3) {
            return "yellow";
        } else {
            return "";
        }
    },
    
    posts: function() {
        return Template.instance().data[2];
    },
    
    rank: function() {
        return Template.instance().data[1];
    },
    
    name: function() {
        return Meteor.users.findOne({
            _id: Template.instance().data[0]
        }).profile.name;
    }
});

/*****************************************************************************/
/* TopUsers: Lifecycle Hooks */
/*****************************************************************************/
Template.TopUsers.onCreated(function () {
});

Template.TopUsers.onRendered(function () {
});

Template.TopUsers.onDestroyed(function () {
});
