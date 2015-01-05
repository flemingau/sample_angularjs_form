'use strict';

/**
 * @ngdoc overview
 * @name sampleAngularApp
 * @description
 * # sampleAngularApp
 *
 * Main module of the application.
 */
var app = angular.module('sampleAngularApp', [
  'sampleAngularApp.main',
  'sampleAngularApp.join',
  'ngCookies',
  'ngRoute',
]);

app.config(function myAppConfig ( $routeProvider, $locationProvider ) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});

app.controller('MainController', function MainController ( ) {
  // Set Debug mode to false for production
  var DEBUG_MODE_ON = true;
  if (!DEBUG_MODE_ON) {
    console = console || {};
    console.log = function(){};
  }
});