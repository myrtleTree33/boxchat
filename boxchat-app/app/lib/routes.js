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
