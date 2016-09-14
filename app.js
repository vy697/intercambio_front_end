'use strict';

var app = angular.module('intercambio', ['ngRoute', 'pascalprecht.translate']);

app.config(['$translateProvider', function($translateProvider) {
  $translateProvider.fallbackLanguage('en');
  $translateProvider.registerAvailableLanguageKeys(['en', 'es'], {
    'en_*': 'en',
    'es_*': 'es'
  });
  $translateProvider.useStaticFilesLoader({
    prefix: 'lang/locale-',
    suffix: '.json'
  });
  $translateProvider.preferredLanguage('en');
  $translateProvider.useSanitizeValueStrategy(null);
}]);

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
