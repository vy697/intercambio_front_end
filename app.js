'use strict';

var app = angular.module('intercambio', ['ui.bootstrap', 'ngAnimate','ngRoute', 'pascalprecht.translate']);

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

app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
}]);

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
  .when('/login', {
    templateUrl: './templates/login.html',
    controller: 'loginController',
    controllerAs: 'login'
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
  })
  .when('/search', {
    templateUrl: './templates/search.html',
    controller: 'searchController',
    controllerAs: 'search'
  })
  .when('/my-profile', {
    templateUrl: './templates/my-profile.html',
    controller: 'myProfileController',
    controllerAs: 'my'
  });
}]);

// app.config(['$window', function($window) {
app.filter('pair', function() {
  return function(data) {
    if(data){
      return '•tandem';
      }
    };
  });
// }]);

app.filter('group', ['$window', function($window) {
  return function(data) {
    if(data && $window.sessionStorage.token === 'en' || localStorage.lang_preference === 'en') {
      return '•group';
    }
    if(data && $window.sessionStorage.token === 'es' || localStorage.lang_preference === 'es') {
      return '•en grupo';
    }
  };
}]);

app.filter('online', function() {
  return function(data) {
    if(data) {
      return '•online';
    }
  };
});

// app.component('modalComponent', {
//   templateUrl: './templates/signinmsg.html',
//   bindings: {
//     resolve: '<',
//     close: '&',
//     dismiss: '&'
//   }
// });
