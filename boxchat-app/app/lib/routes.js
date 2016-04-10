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

Router.route('verify-email/:token', {
  name: 'verifyEmail',
  controller: 'VerifyEmailController',
  where: 'client'
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


Router.route('unauthorized', {
  name: 'unauthorized',
  controller: 'UnauthorizedController',
  where: 'client'
});

Router.route('user_settings', {
  name: 'userSettings',
  controller: 'UserSettingsController',
  where: 'client'
});


Router.route('main', {
  name: 'main',
  controller: 'MainController',
  where: 'client'
});
