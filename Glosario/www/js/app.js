// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','satellizer','ionic-modal-select','starter.controllers','starter.services','ionic.contrib.drawer'])

  .config(function($httpProvider, $stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
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

    .state('materia', {
        url: '/materia',
        templateUrl: 'templates/materia.html',
        controller: 'materiaCtrl'
    })

    .state('busquedaDirecta', {
        url: '/busquedaDirecta',
        templateUrl: 'templates/busquedaDirecta.html',
        controller: 'busquedaDirectaCtrl'
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

  $urlRouterProvider.otherwise('/login');

  })

  .config(function($authProvider) {

    /*
    var commonConfig = {
      popupOptions: {
        location: 'no',
        toolbar: 'yes',
        width: window.screen.width,
        height: window.screen.height
      }
    };

    if (ionic.Platform.isIOS() || ionic.Platform.isAndroid()) {
      commonConfig.redirectUri = 'http://localhost:8100';
    }
    
    $authProvider.google(angular.extend({}, commonConfig, {
      clientId: '310617402015-hp121f8gb6vvkfvc31ttesr481b2c0kc.apps.googleusercontent.com',
      url: 'http://localhost:8100',
    }));
    */

    $authProvider.tokenName = 'tokens';
    $authProvider.authHeader = 'Authorization';
    $authProvider.authToken = 'Bearer';
    $authProvider.loginUrl = "http://localhost:8100/#/login";

    $authProvider.oauth2({
      name: 'google',
      url: 'http://localhost:1337',
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
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });


  

