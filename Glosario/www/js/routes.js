angular.module('starter.routes', [])

.config(function($httpProvider, $stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  $stateProvider
  
    .state('ListExample', {
      url: '/list',
      templateUrl: 'templates/listado.html',
      controller: 'listExampleCtrl'
        });
  
/*
    .state('pagina1', {
    url: '/page1',
    templateUrl: 'templates/pagina1.html',
    controller: 'pagina1Ctrl'
  })

*/


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/list');

});


