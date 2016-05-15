// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic-modal-select','starter.controllers','starter.services','GoogleLoginService'])

  .config(function($httpProvider, $stateProvider, $urlRouterProvider) {

  $stateProvider
    
    .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'google'
  })

  .state('consultar', {
      url: '/consultar',
      templateUrl: 'templates/consultar.html',
      controller: 'consultarCtrl'
  })

    .state('listadoUltimos', {
      url: '/ultimos',
      templateUrl: 'templates/ultimos.html',
      controller: 'ultimosCtrl'
  })

    .state('listadoMateria', {
      url: '/materia',
      templateUrl: 'templates/materia.html',
      controller: 'materiaCtrl'
  })

  .state('terminosPorMateria', {
      url: '/terminosPorMateria',
      templateUrl: 'templates/terminosPorMateria.html',
      controller: 'terminosPorMateriaCtrl'
  })

  .state('definiciones', {
      url: '/definiciones',
      templateUrl: 'templates/definiciones.html',
      controller: 'definicionesCtrl'
  })

//$urlRouterProvider.otherwise('/login')
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
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

