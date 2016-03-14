angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('pagina1', {
    url: '/page1',
    templateUrl: 'templates/pagina1.html',
    controller: 'pagina1Ctrl'
  })

  .state('no', {
    url: '/',
    templateUrl: 'templates/no.html',
    abstract:true
  })

  .state('pagina2', {
    url: '/page2',
    templateUrl: 'templates/pagina2.html',
    controller: 'pagina2Ctrl'
  })

$urlRouterProvider.otherwise('/page1')

  

});