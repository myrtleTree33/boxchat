Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});


Router.route('/', {
  name: 'home',
  controller: 'HomeController',
  where: 'client'
});

Router.route('todos', {
  name: 'todos',
  controller: 'TodosController',
  where: 'client'
});

Router.route('signup', {
  name: 'signup',
  controller: 'SignupController',
  where: 'client'
});

Router.route('task', {
  name: 'task',
  controller: 'TaskController',
  where: 'client'
});


Router.route('authenticated', {
  name: 'authenticated',
  controller: 'AuthenticatedController',
  where: 'client'
});

Router.route('verify-email/:token', function() {
  console.log('here');
  Accounts.verifyEmail(this.params.token, function(err){
    if (err) {
      console.log('called --- fail');
      Bert.alert(err.reason, 'danger');
    } else {
      console.log('called --- pass');
      Router.go('/');
      Bert.alert('Email verified!', 'success');
    }
  });
});


Router.route('login', {
  name: 'login',
  controller: 'LoginController',
  where: 'client'
});

Router.route('timeline', {
  name: 'timeline',
  controller: 'TimelineController',
  where: 'client'
});

Router.route('profile', {
  name: 'profile',
  controller: 'ProfileController',
  where: 'client'
});

Router.route('forum/view/:id', {
  name: 'forum',
  controller: 'ForumController',
  where: 'client'
});

Router.route('forum/ask/:forumId', {
  name: 'ask',
  controller: 'AskController',
  where: 'client'
});


Router.route('forum/create', {
  name: 'forumCreate',
  controller: 'ForumCreateController',
  where: 'client'
});


Router.route('question/view/:id', {
  name: 'question',
  controller: 'QuestionController',
  where: 'client'
});


Router.route('forum/settings/:id', {
  name: 'forumSettings',
  controller: 'ForumSettingsController',
  where: 'client'
});


Router.route('forum/analytics/:id', {
  name: 'forumAnalytics',
  controller: 'ForumAnalyticsController',
  where: 'client'
});
