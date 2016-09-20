'use strict';

app.controller('landingController', ['logoutService', 'userService', 'loginService', 'localizeService', 'searchService', '$translate', '$http', '$window', '$location', function(logoutService, userService, loginService, localizeService, searchService, $translate, $http, $window, $location) {

  var vm = this;

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
    $http.get('http://localhost:3000/search/results', {params:{"i_speak": i_speak, "i_learn": i_learn, "city": city}})
    .then(function(data) {
      console.log('findMatches on landing: ', data);
      searchService.searchResults.data = data.data;
      $location.url('/search');
    })
    .catch(function(err) {
      console.log('findMatches err on landing: ', err);
    });
  };


  //localize page based on user's lang setting
  localizeService.localizeForUser();

}]);

app.controller('signupController', ['searchService', '$http', '$window', function(searchService, $http, $window) {

  var vm = this;

  vm.cityList = searchService.cityList; 

  vm.getCities = searchService.getCities();

  vm.submit = function(name, email, password, city, description, age, photo_url, pair, group, online, lang_preference, i_speak, i_learn, i_speak_level, i_learn_level) {
    // console.log(vm.name, vm.email, vm.password, vm.city, vm.description, vm.age, vm.photo_url, vm.pair, vm.group, vm.online, vm.lang_preference, vm.i_speak, vm.i_speak_level, vm.i_learn, vm.i_learn_level);
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

  //list of user's language exchange matches
  vm.searchResults = searchService.searchResults;
  // vm.searchResults = {};

  //ng-click to retrieve matches based on user inputs
  vm.findMatches = searchService.findMatches;
  // vm.findMatches = function(i_speak, i_learn, city) {
  //   searchService.findMatches(i_speak, i_learn, city)
  //   .then(function(data) {
  //     vm.searchResults.data = data.data;
  //     console.log(data);
  //   })
  //   .catch(function(err) {
  //     console.log('findMatches err: ', err);
  //   });
  // };

  //localize page based on user's lang setting
  localizeService.localizeForUser();

}]);
