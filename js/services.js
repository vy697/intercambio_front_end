'use strict';

app.service('localizeService', ['$translate', '$window', function($translate, $window){

  var sv = this;

  //store lang keys here
  sv.keys = {
    en: 'en',
    es: 'es'
  };

  sv.localizeForUser = function(key) {

    console.log('localStorage', localStorage.lang_preference);
    //user's language settings determine the language of the session
    if($window.sessionStorage.token) {
      key = $window.sessionStorage.lang_preference;
      $translate.use(key);
    //if a user's not logged in, save whatever they chose to localStorage, if they happened to change the language from default English
  } else if(localStorage.lang_preference){
      key = localStorage.lang_preference;
      $translate.use(key);
    } else if(!$window.sessionStorage.token && !localStorage.lang_preference) {
      localStorage.setItem('lang_preference', 'en');
    }
  };

  //THIS WORKS, IT GRABS THE KEY
  sv.changeLanguage = function(key) {
    $translate.use(key);
    //when default lang settings change, store it in local storage so that the setting persists
    localStorage.setItem('lang_preference', key);
  };

}]);


app.service('searchService', ['$http', '$window', function($http, $window) {

  var sv = this;

  sv.cityList = {};

  sv.getCities = function() {
    var lang_preference;

    if($window.sessionStorage.lang_preference) {
      lang_preference = $window.sessionStorage.lang_preference;
    //request here with whatever lang_preference is in localStorage
    } else if (localStorage.lang_preference) {
      lang_preference = localStorage.lang_preference;
    } else {
      lang_preference = 'en';
    }
      $http.get('http://localhost:3000/search/cities', {params:{"lang_preference": lang_preference}})
      .then(function(data) {
        console.log('cities data: ', data);
        sv.cityList.data = data.data;
      })
      .catch(function(err) {
        console.log('cities err:', err);
      });
    };

  sv.exchanges = {};

  sv.getExchanges = function() {
    var lang_preference;

    if($window.sessionStorage.lang_preference) {
      lang_preference = $window.sessionStorage.lang_preference;
    //request here with whatever lang_preference is in localStorage
    } else if (localStorage.lang_preference) {
      lang_preference = localStorage.lang_preference;
    } else {
      lang_preference = 'en';
    }
    $http.get("http://localhost:3000/search", {params:{"lang_preference": lang_preference}})
    .then(function(data) {
      sv.exchanges.data = data.data;
      console.log('THIS IS THE EXCHANGE DATA: ', sv.exchanges);
    })
    .catch(function(err) {
      console.log('where is my data: ', err);
    });
  };

  sv.searchResults = {};

  sv.findMatches = function(i_speak, i_learn, city) {

    console.log('findMatches invoked', i_speak, i_learn, city);
    var lang_preference;

    if($window.sessionStorage.lang_preference) {
      lang_preference = $window.sessionStorage.lang_preference;
    //request here with whatever lang_preference is in localStorage
    } else if (localStorage.lang_preference) {
      lang_preference = localStorage.lang_preference;
    } else {
      lang_preference = 'en';
    }
    $http.get('http://localhost:3000/search/results', {params:{"i_speak": i_speak, "i_learn": i_learn, "city": city, "lang_preference": lang_preference}})
    .then(function(data) {
      sv.searchResults.data = data.data;
      console.log('initial searchResults data:' , data);
    })
    .catch(function(err) {
      console.log('search results err: ', err);
    });
  };

}]);

app.service('userService', ['$http', '$window', function($http, $window) {

  var sv = this;

  sv.userData = {};

  sv.getUserInfo = function() {
    //if a user is logged in (if a jwt exists), retrieve their info
    if($window.sessionStorage.token) {
    return $http.get('http://localhost:3000/users')
    .then(function(data) {
      sv.userData.data = data.data.data[0];
    })
    .catch(function(err) {
      console.log('getUserInfo err: ', err);
    });
   }
  };
}]);

app.service('loginService', ['$window', '$http', '$location', function($window, $http, $location) {

  var sv = this;

  sv.login = function(email, password) {
     return $http.post('http://localhost:3000/auth', {
      email: email,
      pw: password
    })
    //logs user in with token
    .then(function(result) {
      console.log('login result:', result);
      //set token in window session storage
      $window.sessionStorage.token = result.data.token;
      //set lang_preference in window session storage
      $window.sessionStorage.lang_preference = result.data.profile.lang_preference;
      //send user to their home page
      $location.url('/home');
     })
    .catch(function(err) {
      console.log('login error: ', err);
      delete $window.sessionStorage.token;
    });
  };
}]);

app.service('logoutService', ['$window', '$location', function($window, $location) {

  var sv = this;

  sv.showLogout = false;

  sv.showLogOutFunc = function() {
    if($window.sessionStorage.token) {
      sv.showLogout = true;
    } else {
      sv.showLogout = false;
    }
  };

  sv.logout = function() {
    delete $window.sessionStorage.token;

    sv.showLogout = false;

    // $location.url('/');
    $window.location.href = '/';

    sv.message = 'successfully logged out';
  };

}]);
