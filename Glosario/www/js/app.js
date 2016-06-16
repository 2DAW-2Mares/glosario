// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic','satellizer','ionic-modal-select','starter.controllers','starter.services'])

  .config(function($httpProvider, $stateProvider, $urlRouterProvider) {

  $stateProvider


      // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    .state('tab.login', {
      url: '/login',
      views: {
        'login': {
          templateUrl: 'templates/login.html',
          controller: 'loginCtrl'
        }
      }
    })

    .state('tab.consultar', {
      url: '/consultar',
      views: {
        'consultar': {
          templateUrl: 'templates/consultar.html',
          controller: 'consultarCtrl'
        }
      }
    })

    .state('tab.ultimos', {
      url: '/ultimos',
      views: {
        'consultar': {
          templateUrl: 'templates/ultimos.html',
          controller: 'ultimosCtrl'
        }
      }
    })

    .state('tab.materia', {
      url: '/materia',
      views: {
        'consultar': {
          templateUrl: 'templates/materia.html',
          controller: 'materiaCtrl'
        }
      }
    })

    .state('tab.busquedaDirecta', {
      url: '/busquedaDirecta',
      views: {
        'consultar': {
          templateUrl: 'templates/busquedaDirecta.html',
          controller: 'busquedaDirectaCtrl'
        }
      }
    })

    .state('tab.terminosPorMateria', {
      url: '/terminosPorMateria',
      views: {
        'consultar': {
          templateUrl: 'templates/terminosPorMateria.html',
          controller: 'terminosPorMateriaCtrl'
        }
      }
    })

    .state('tab.definiciones', {
      url: '/definiciones',
      views: {
        'consultar': {
          templateUrl: 'templates/definiciones.html',
          controller: 'definicionesCtrl'
        }
      }
    })

    .state('tab.usuario', {
      url: '/usuario',
      views: {
        'usuario': {
          templateUrl: 'templates/usuario.html',
          controller: 'usuarioCtrl'
        }
      }
    })

    .state('tab.definicionesDenunciadas', {
      url: '/definicionesDenunciadas',
      views: {
        'usuario': {
          templateUrl: 'templates/definicionesDenunciadas.html',
          controller: 'definicionesDenunciadasCtrl'
        }
      }
    })

    .state('tab.listarAlumnos', {
      url: '/listarAlumnos',
      views: {
        'usuario': {
          templateUrl: 'templates/listarAlumnos.html',
          controller: 'listarAlumnosCtrl'
        }
      }
    })

  $urlRouterProvider.otherwise('/tab/consultar');

  })

  .config(function($authProvider) {

    $authProvider.tokenName = "token";
    $authProvider.authHeader = 'Authorization';
    $authProvider.authToken = 'Bearer';

    $authProvider.oauth2({
      name: 'google',
      url: 'http://localhost:8100',
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},

      clientId: '310617402015-km1v4tpfanohdohd9a75cfb236757pac.apps.googleusercontent.com',
      redirectUri: 'http://localhost:8100',
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
      scope: ['profile', 'email'],
      scopePrefix: 'openid',
      scopeDelimiter: ' ',
      requiredUrlParams: ['scope'],
      optionalUrlParams: ['display'],
      display: 'popup',
      type: '2.0',
      popupOptions: { width: window.screen.width, height: window.screen.height },
      storageType: 'localStorage',
    });
  })

  .run(function($ionicPlatform, $http) {

    $http.defaults.headers.common.Authorization = 'Basic YWRtaW46YWRtaW4xMjM0';

    $ionicPlatform.ready(function() {

      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
})

  

