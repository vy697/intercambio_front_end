'use strict';

app.controller('landingController', ['logoutService', 'userService', 'loginService', 'localizeService', 'searchService', '$translate', '$http', '$window', '$location', function(logoutService, userService, loginService, localizeService, searchService, $translate, $http, $window, $location) {

  var vm = this;

  //language keys are stored here
  vm.keys = localizeService.keys;

  vm.showLogin = false;

  vm.showLoginFunc = function() {
    if(!vm.showLogin) {
      vm.showLogin = true;
    } else {
      vm.showLogin = false;
    }
  };

  //on button clicks ng-click
  vm.changeLanguage = localizeService.changeLanguage;
  //retrieve list of all users
  vm.getExchanges = searchService.getExchanges;
  //list of all users
  vm.exchanges = searchService.exchanges;
  //log user in
  vm.login = loginService.login;
  //if a user is logged in, retrieve their info
  vm.getUserInfo = userService.getUserInfo();
  //user information for logged in user saved here
  vm.userData = userService.userData;
  //localize page based on user's lang setting
  localizeService.localizeForUser();
  //shows welcome message on landing or not
  logoutService.showLogOutFunc();
  //state of logout(in this case for the welcome message) option (true/false)
  vm.showLogout = logoutService.showLogout;

  //list of user's language exchange matches
  vm.searchResults = searchService.searchResults;
  //ng-click to retrieve matches based on user inputs
  vm.findMatches = function(i_speak, i_learn, city) {
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
      console.log('findMatches on landing: ', data);
      searchService.searchResults.data = data.data;
      $location.url('/search');
    })
    .catch(function(err) {
      console.log('findMatches err on landing: ', err);
    });
  };

  //retrieve cities upon going to view
  vm.getCities = searchService.getCities();
  //list of cities are stored here to be accessed in the view in the select box
  vm.cityList = searchService.cityList;

}]);

app.controller('signupController', ['localizeService', 'searchService', '$http', '$window', function(localizeService, searchService, $http, $window) {

  var vm = this;

  //set language keys are stored here
  vm.keys = localizeService.keys;
  vm.key = localizeService.key;
  //localize page based on user's lang setting
  localizeService.localizeForUser();

  //list of cities are stored here to be accessed in the view in the select box
  vm.cityList = searchService.cityList;
  console.log('vm.cityList: ', vm.citylist);

  //retrieve cities upon going to view
  vm.getCities = searchService.getCities();

  vm.submit = function(name, email, password, city, description, age, photo_url, pair, group, online, lang_preference, i_speak, i_learn, i_speak_level, i_learn_level) {
    console.log(vm.name, vm.email, vm.password, vm.city, vm.description, vm.age, vm.photo_url, vm.pair, vm.group, vm.online, vm.lang_preference, vm.i_speak, vm.i_speak_level, vm.i_learn, vm.i_learn_level);
    return $http.post('http://localhost:3000/signup', {
      name: name,
      email: email,
      pw: password,
      city: city,
      description: description,
      age: age,
      photo_url: photo_url,
      pair: pair,
      group: group,
      online: online,
      lang_preference: lang_preference,
      user_speaks: {
        language_id: i_speak,
        level_id: i_speak_level
      },
      user_learns: {
        language_id: i_learn,
        level_id: i_learn_level
      }
    })
    .then(function(result) {
      console.log('ANGULAR SIGNUP RESULT: ', result);
    })
    .catch(function(err) {
      err.statusText = "Unable to sign up";
      console.log('SIGNUP ERROR:', err);
    });
  };
}]);

app.controller('profileController', [function() {

  var vm = this;

  vm.message = 'PROFILE CONTROLLER';

}]);

app.controller('homeController', ['userService', 'localizeService', function(userService, localizeService) {

  var vm = this;

  //if a user is logged in, retrieve their info
  vm.getUserInfo = userService.getUserInfo();

  //user information for logged in user saved here
  vm.userData = userService.userData;

  //localize page based on user's lang setting
  localizeService.localizeForUser();

}]);

app.controller('indexController', ['logoutService', function(logoutService) {

  var vm = this;

  //shows logout option or not
  logoutService.showLogOutFunc();

  //state of logout option (true/false)
  vm.showLogout = logoutService.showLogout;

  //logs user out
  vm.logout = logoutService.logout;

}]);

app.controller('searchController', ['searchService', 'localizeService', function(searchService, localizeService) {

  var vm = this;

  //retrieve cities upon going to view
  vm.getCities = searchService.getCities();
  //list of cities are stored here to be accessed in the view in the select box
  vm.cityList = searchService.cityList;

  //list of user's language exchange matches
  vm.searchResults = searchService.searchResults;

  //ng-click to retrieve matches based on user inputs
  vm.findMatches = searchService.findMatches;

  //set language keys are stored here
  vm.keys = localizeService.keys;

  //localize page based on user's lang setting
  localizeService.localizeForUser();
  //language keys are stored here
  vm.keys = localizeService.keys;
  vm.key = localizeService.key;

}]);
