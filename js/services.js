'use strict';

app.service('localizeService', ['$translate', '$window', function($translate, $window){

  var sv = this;

  sv.localizeForUser = function(key) {
    if($window.sessionStorage.token) {
      key = $window.sessionStorage.lang_preference;
      $translate.use(key);
    }
  };

  sv.changeLanguage = function(key) {
    $translate.use(key);
  };

}]);


app.service('searchService', ['$http', '$window', function($http, $window) {

  var sv = this;

  sv.cityList = {};

  sv.getCities = function() {
      $http.get('http://localhost:3000/search/cities/en')
      .then(function(data) {
        console.log('english cities data: ', data);
        // sv.cityList.data = data.data;
      })
      .catch(function(err) {
        console.log('english cities err:', err);
      });
    };

  //TODO: set for specific languages
  // sv.getCities = function() {
  //   if($window.sessionStorage.lang_preference === 'en') {
  //     $http.get('http://localhost:3000/search/cities/en')
  //     .then(function(data) {
  //       console.log('english cities data: ', data);
  //       // sv.cityList.data = data.data;
  //     })
  //     .catch(function(err) {
  //       console.log('english cities err:', err);
  //     });
  //   }
  // };

  sv.exchanges = {};

  sv.getExchanges = function() {
    $http.get("http://localhost:3000/search")
    .then(function(data) {
      sv.exchanges.data = data.data;
      console.log('THIS IS THE EXCHANGE DATA: ', sv.exchanges);
    })
    .catch(function(err) {
      console.log('where is my data: ', err);
    });
  };

  sv.searchResults = {};
  //store Spanish strings here
  sv.lang_preferenceES = {};

  sv.findMatches = function(i_speak, i_learn, city) {

    console.log('findMatches invoked', i_speak, i_learn, city);
    $http.get('http://localhost:3000/search/results', {params:{"i_speak": i_speak, "i_learn": i_learn, "city": city}})
    .then(function(data) {
      //if session is in English data stays as is (in English)
      sv.searchResults.data = data.data;
      console.log('initial searchResults data:' , data);


      // var exchangeList = sv.searchResults.data.data;
      // if it's in another language change the values that need to be translated
      // TODO: commented out first intent at switch language upon data retrieval starts here
      // if($window.sessionStorage.lang_preference === 'es') {
      //   $http.get('../lang/locale-es.json')
      //   .then(function(data) {
      //     console.log('locale-es data: ', data);
      //     sv.lang_preferenceES.data = data;
      //     //loop through the array of objects
      //     for(var i = 0; i < sv.searchResults.data.length; i++) {
      //       //loop through each obj and change appropriate values: city, languages
      //       for (var user_detail in sv.searchResults.data[i]) {
      //         console.log('sv.searchResults.data[i]', sv.searchResults.data[i]);
      //         console.log('user_detail:', user_detail);
      //         if(user_detail === 'learns_language') {
      //
      // //           //TODO: how to switch the values? error: Cannot create property 'learns_language' on string 'learns_language'
      //           user_detail.learns_language = sv.lang_preferenceES.data.data.en;
      //         }
      //
      //       }
      //     }
      //   })
      //   .catch(function(err) {
      //     console.log('update language err:', err);
      //   });
      // }



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
