/*****************************************************************************/
/* ForumCreate: Event Handlers */
/*****************************************************************************/

// email validator from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
function isEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


//console.log(window.location.href);

Template.ForumCreate.events({
  'click #ivle': function() {
    var APIKey = "xb3Rqqg52Rih2GKvJAhkG";
    var APIDomain = "https://ivle.nus.edu.sg/";
    var APIUrl = APIDomain + "api/lapi.svc/";
    var redirect = window.location.href;
    var LoginURL = APIDomain + "api/login/?apikey=xb3Rqqg52Rih2GKvJAhkG&url=" + redirect ;

    var myModuleInfo = null;

    //JH
    var id = [];

    //function to get the query string parameters
    var search = function () {
        var p = window.location.search.substr(1).split(/\&/), l = p.length, kv, r = {};
        while (l--) {
            kv = p[l].split(/\=/);
            r[kv[0]] = kv[1] || true; //if no =value just set it as true
        }
        return r;
    } ();


    //variable to store the Authentication Token
    var Token = "";

    //check query string for search token
    if (search.token && search.token.length > 0 && search.token != 'undefined') {
        Token = search.token;
    }

    
        if (Token.length < 1) {
          window.open(LoginURL,'popup','width=600,height=600'); 
          return false;
          //window.location = LoginURL;
        }
        else {
            //$('#lbl_Token').html(Token);

            Populate_UserName();

            //Populate_Module();

            //JH
            //Populate_Roster();
        }
    
  },
  
  'submit #form-create-forum': function(event, template) {
    event.preventDefault();
    var obj = event.target;
    var title = obj.title.value;
    // empty or array: S/O http://stackoverflow.com/questions/10346722/how-can-i-split-a-javascript-string-by-white-space-or-comma
    var users = obj.users.value.split(/[ ,]+/).filter(Boolean);
    var description = obj.description.value;
    var tags = obj.stickyTags.value.split(/[ ,]+/).filter(Boolean);

    var escapeTags = function(tags) {
      var output = [];
      for (var i = 0; i < tags.length; i++) {
        var t = tags[i];
        console.log(t)
        if (t.charAt(0) !== '#') {
          console.log('here');
          t = '#' + t;
        }
        output.push(t);
      }
      return output;
    }

    var _tags = escapeTags(tags); // properly format hashtag
    var allUsers = lodash.union([Meteor.user()._id].concat(users));
    var adminUsers = lodash.union([Meteor.user()._id]);

    var formData = {
      createdAt: new Date(),
      all: allUsers,
      students: users,
      admin: adminUsers,
      title: title,
      description: description,
      questionIds: [],
      tags: _tags
    };


    //get the captcha data
    var captchaData = grecaptcha.getResponse();

    Meteor.call('forum/createForumFormValidify', formData, captchaData, function(error, forumId) {
      // reset the captcha
      grecaptcha.reset();
      if (error) {
        Bert.alert('Oops, error creating forum!', 'danger', 'growl-top-right');
      } else {
        Bert.alert('Created forum successfully!', 'success', 'growl-top-right');

        Router.go('forum', {
          id: forumId
        });
      }
    });
  }
});

/*****************************************************************************/
/* ForumCreate: Helpers */
/*****************************************************************************/
Template.ForumCreate.helpers({});

/*****************************************************************************/
/* ForumCreate: Lifecycle Hooks */
/*****************************************************************************/
Template.ForumCreate.onCreated(function() {});

Template.ForumCreate.onRendered(function() {


  $('.ui.dropdown').dropdown();
  Meteor.call('topMenu/toggleMenuItem', '#btn-createForum');

  $('#forum-tags').selectize({
    delimiter: ',',
    persist: false,
    options: [{
      text: '#exam',
      value: '#exam'
    }, {
      text: '#midterm',
      value: '#midterm'
    }, {
      text: '#important',
      value: '#important'
    }, {
      text: '#tut1',
      value: '#tut1'
    }, {
      text: '#tut2',
      value: '#tut2'
    }, {
      text: '#tut3',
      value: '#tut3'
    }, {
      text: '#tut4',
      value: '#tut4'
    }, {
      text: '#tut5',
      value: '#tut5'
    }],
    create: function(input) {
      return {
        value: input,
        text: input
      }
    }
  });

  $('#forum-users').selectize({
    delimiter: ',',
    persist: false,
    createFilter: function(input) {
      return isEmail(input);
    },
    create: function(input) {
      return {
        _id: input,
        'name': input
      };
    },
    valueField: '_id',
    labelField: 'name',
    searchField: ['name'],
    render: {
      item: function(item, escape) {
        var name = escape(item.name);
        return '<div>' +
          ('<span class="forum-search-title">' + name + '</span>') +
          '</div>';
      },
      option: function(item, escape) {
        var name = escape(item.name);
        return '<div>' +
          ('<span class="forum-search-title">' + name + '</span>') +
          '</div>';
      }
    },
    load: function(query, callback) {
      Meteor.call('forum/createForumFindUsers', query, function(err, data) {
        if (err) {
          console.error("Some error occuered: " + err);
          return;
        }

        var _results = _.map(data, function(user) {
          return {
            _id: user._id,
            name: user.profile['name']
          }
        });
        callback(_results);
      });

    }
  });
});

Template.ForumCreate.onDestroyed(function() {});

    function Populate_UserName() {
        var url = APIUrl + "UserName_Get?output=json&callback=?&APIKey=" + APIKey + "&Token=" + Token;
        $('#request').append("<span>Request: " + url + "</span><br />");

        jQuery.getJSON(url, function (data) {
            $('#name').html(data);
            $('#response').append("<span>Response: " + data + "</span>");
        });
    }

    function Populate_Module() {
        var ModuleURL = APIUrl + "Modules?APIKey=" + APIKey + "&AuthToken=" + Token + "&Duration=1&IncludeAllInfo=false&output=json&callback=?";
        $('#dbg_Modules').append("<span>Request: " + ModuleURL + "</span><br />");

        //Get all the modules belonging to me
        jQuery.getJSON(ModuleURL, function (data) {
            $('#dbg_Modules').append("<span>Response: " + data + "</span>");
            myModuleInfo = data;


            var lbl_Module = "";
            for (var i = 0; i < data.Results.length; i++) {
                var m = data.Results[i];

                //output the course code, acadyear and coursename
                lbl_Module += m.CourseCode + " " + m.CourseAcadYear + " - " + m.CourseName;

                //if there's new notifications add it in at the end
                if (m.Badge > 0)
                    lbl_Module += " (" + m.Badge + ")";

                //put a line break
                lbl_Module += "<br />";

                //JH
                id.push(m.ID);
                lbl_Module += id[i];
                lbl_Module += "<br/>";
                //lbl_Module += JSON.stringify(m);
                //lbl_Module += "<br/>";

                //get the tools belonging to this module
                lbl_Module += "<span id='announcement_" + m.ID + "' />";
                lbl_Module += "<span id='forum_" + m.ID + "' />";
                lbl_Module += "<span id='workbin_" + m.ID + "' />";
            }

            $('#lbl_Modules').html(lbl_Module);
        });
    }

    function Populate_Roster() {
      var RosterURL = APIUrl + "Class_Roster?APIKey=" + APIKey + "&AuthToken=" + Token + "&CourseID=2b6890d1-4a05-40eb-b3a7-4eb29b2d7d77&output=json&callback=?";
      $('#dbg_Rosters').append("<span>Request: " + RosterURL + "</span><br />");

        //Get all the modules belonging to me
        jQuery.getJSON(RosterURL, function (data) {
          $('#dbg_Rosters').append("<span>Response: " + data + "</span>");
          //myModuleInfo = data;


          var lbl_Roster = "";
          for (var i = 0; i < data.Results.length; i++) {
            var r = data.Results[i];

                lbl_Roster += JSON.stringify(r);
                lbl_Roster += "<br/>";


              }

              $('#lbl_Rosters').html(lbl_Roster);
            });
      }
