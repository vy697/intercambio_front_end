'use strict';

var app = angular.module('intercambio', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: './templates/landing.html',
    controller: 'landingController',
    controllerAs: 'land'
  })
  .when('/signup', {
    templateUrl: './templates/sign_up.html',
    controller: 'signupController',
    controllerAs: 'signup'
  });
}]);
