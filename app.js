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
  })
  .when('/profile', {
    templateUrl: './templates/profile.html',
    controller: 'profileController',
    controllerAs: 'pro'
  })
  .when('/home', {
    templateUrl: './templates/home.html',
    controller: 'homeController',
    controllerAs: 'home'
  })
  .when('/messages', {
    templateUrl: './templates/messages.html',
    controller: 'messageController',
    controllerAs: 'msg'
  })
  .when('/settings', {
    templateUrl: './templates/settings.html',
    controller: 'settingsController',
    controllerAs: 'set'
  });
}]);

app.factory('authInterceptor', ['$q', '$window', function($q, $window) {
  return {
    request: function(config) {
      config.headers = config.headers || {};
      if($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    response: function(response) {
      if(response.status === 401) {
        console.log('user is not authorized');
      }
      return response || $q.when(response);
    }
  };
}]);

app.filter('pair', function() {
  return function(data) {
      if(data){
        return '•pair';
      }
    };
  });

app.filter('group', function() {
  return function(data) {
    if(data) {
      return '•group';
    }
  };
});

app.filter('online', function() {
  return function(data) {
    if(data) {
      return '•online';
    }
  };
});
