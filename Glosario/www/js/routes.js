angular.module('starter.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    
    .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'google'
      
    
  })

$urlRouterProvider.otherwise('/login')

});
