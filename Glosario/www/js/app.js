// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','starter.controllers','GoogleLoginService'])

  .config(function($httpProvider, $stateProvider, $urlRouterProvider) {

  $stateProvider
    
    .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'google'
  })

  .state('ListExample', {
      url: '/list',
      templateUrl: 'templates/listado.html',
      controller: 'listExampleCtrl'
  })

  .state('consultar', {
      url: '/consultar',
      templateUrl: 'templates/consultar.html',
      controller: 'listExampleCtrl'
  });

$urlRouterProvider.otherwise('/login')
/*
$httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
        return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    var mami = $localStorage.timeStorage;
                    console.log('Hola: '+ mami);
                    
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/login');
                    }
                    return $q.reject(response);
                }
            };
        }]);
*/
})

