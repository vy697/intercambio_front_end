'use strict';

app.controller('landingController', ['apiService', 'logoutService', 'userService', 'loginService', 'localizeService', 'searchService', '$translate', '$http', '$window', '$location', function(apiService, logoutService, userService, loginService, localizeService, searchService, $translate, $http, $window, $location) {

  var vm = this;

  //language keys are stored here
  vm.keys = localizeService.keys;

  vm.showLogin = false;

  //on button clicks ng-click
  vm.changeLanguage = localizeService.changeLanguage;

  //retrieve list of all users
  vm.getExchanges = searchService.getExchanges;
  //list of all users
  vm.exchanges = searchService.exchanges;

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

  vm.errorMessage = '';

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
    if(vm.form.$valid) {
      $http.get(apiService.getApiUrl() + 'search/results', {params:{"i_speak": i_speak, "i_learn": i_learn, "city": city, "lang_preference": lang_preference}})
      .then(function(data) {
        console.log('findMatches on landing: ', data);
        searchService.searchResults.data = data.data;

        if(data.data.message === 'no matches were found') {
          searchService.searchResults = {};
          searchService.searchResults.message = localizeService.keys.no_results[lang_preference];
        } else {
          searchService.searchResults.data = data.data;
          searchService.searchResults.message = localizeService.keys.yes_results[lang_preference];
        }
        console.log('searchResults on landing: ', searchService.searchResults);
      })
      .then(function() {
        $location.url('/search');
      })
      .catch(function(err) {
        console.log('findMatches err on landing: ', err);
      });
    } else {
      //render validation message from lang keys object on localizeService
      vm.errorMessage = vm.keys.err[lang_preference];
    }
  };

  //retrieve cities upon going to view
  vm.getCities = searchService.getCities();
  //list of cities are stored here to be accessed in the view in the select box
  vm.cityList = searchService.cityList;

}]);

app.controller('signupController', ['apiService', '$location', 'localizeService', 'searchService', '$http', '$window', function(apiService, $location, localizeService, searchService, $http, $window) {

  var vm = this;

  //set language keys are stored here
  vm.keys = localizeService.keys;

  //localize page based on user's lang setting
  localizeService.localizeForUser();

  //list of cities are stored here to be accessed in the view in the select box
  vm.cityList = searchService.cityList;
  console.log('vm.cityList: ', vm.citylist);

  //retrieve cities upon going to view
  vm.getCities = searchService.getCities();

  vm.errorMessage = '';

  vm.submit = function(name, email, password, city, description, age, photo_url, pair, group, online, lang_preference, i_speak, i_learn, i_speak_level, i_learn_level) {
    console.log(vm.name, vm.email, vm.password, vm.city, vm.description, vm.age, vm.photo_url, vm.pair, vm.group, vm.online, vm.lang_preference, vm.i_speak, vm.i_speak_level, vm.i_learn, vm.i_learn_level);
    console.log('SUBMIT INVOKED');
    //set language to display form validations in
    var language = '';

    if(localStorage.lang_preference) {
        language = localStorage.lang_preference;
      } else {
        language = 'en';
      }

    //if the form meets the set requirements, send it through to be posted
    if(vm.form.$valid) {

      console.log('SUBMIT INVOKED IN VALID FORM');

      return $http.post(apiService.getApiUrl() + 'signup', {
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
        $location.url('/login');
      })
      .catch(function(err) {
        err.statusText = "Unable to sign up";
        console.log('SIGNUP ERROR:', err);
      });
      //otherwise display validation messages
    } else {
      vm.errorMessage = vm.keys.form_validate[language];
      console.log(vm.errorMessage);
    }
  };
}]);

app.controller('profileController', ['$window', 'userService', function($window, userService) {

  var vm = this;

  vm.message = 'PROFILE CONTROLLER';

  //user's profile data is stored here
  vm.userProfile = userService.userProfile.data;
  console.log(vm.userProfile);

  vm.goBack = function() {
    $window.history.back();
  };

}]);

app.controller('homeController', ['searchService', 'userService', 'localizeService', function(searchService, userService, localizeService) {

  var vm = this;

  //if a user is logged in, retrieve their info
  vm.getUserInfo = userService.getUserInfo();

  //user information for logged in user saved here
  vm.userData = userService.userData;

  //localize page based on user's lang setting
  localizeService.localizeForUser();

  //list of logged in user's matches stored here
  vm.searchResults = searchService.searchResults;

  vm.findMatchesForUser = searchService.findMatchesForUser;

  //get user profile from search results
  vm.goToProfile = userService.goToProfile;

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

app.controller('searchController', ['apiService', '$uibModal', '$log', 'userService', '$window', '$http', 'searchService', 'localizeService', function(apiService, $uibModal, $log, userService, $window, $http, searchService, localizeService) {

  var vm = this;

  vm.name = userService.name;

  //get user's name
  vm.getName = userService.getName();

  //language keys are stored here
  vm.keys = localizeService.keys;

  //localize page based on user's lang setting
  localizeService.localizeForUser();

  if($window.sessionStorage.token) {
    vm.showLogout = true;
    vm.loggedIn = true;
  } else {
    vm.showLogout = false;
    vm.loggedIn = true;
  }

  //on button clicks ng-click
  vm.changeLanguage = localizeService.changeLanguage;

  //retrieve cities upon going to view
  vm.getCities = searchService.getCities();
  //list of cities are stored here to be accessed in the view in the select box
  vm.cityList = searchService.cityList;

  //ng-click to retrieve matches based on user inputs
  vm.searchResults = searchService.searchResults;

  vm.errorMessage = '';

  vm.results_exist = false;

  vm.findMatches = function(i_speak, i_learn, city) {

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
    if(vm.form.$valid) {
    vm.errorMessage = '';
    $http.get(apiService.getApiUrl() + 'search/results', {
      params: {
        "i_speak": i_speak,
        "i_learn": i_learn,
        "city": city,
        "lang_preference": lang_preference
      }
    })
    .then(function(data) {
      console.log('initial searchResults data:' , data);
      console.log('lang_preference: ', lang_preference);

      if(data.data.message === 'no matches were found') {
        vm.searchResults.data = [];
        vm.searchResults.message = localizeService.keys.no_results[lang_preference];
        vm.results_exist = false;
      } else {
        //set result list to empty if new search doesn't return anything
        vm.searchResults.data = data.data;
        vm.searchResults.message = localizeService.keys.yes_results[lang_preference];
        vm.results_exist = true;
      }
    })
    .catch(function(err) {
      console.log('search results err: ', err);
    });
  } else {
    //render validation message from lang keys object on localizeService
    vm.errorMessage = vm.keys.err[lang_preference];
  }

};

vm.showOnlineFunc = function() {
  vm.showOnline = true;
};

vm.findOnlineMatches = function(language) {
  var lang_preference;
  if($window.sessionStorage.lang_preference) {
    lang_preference = $window.sessionStorage.lang_preference;
  //request here with whatever lang_preference is in localStorage
    } else if (localStorage.lang_preference) {
    lang_preference = localStorage.lang_preference;
    } else {
      lang_preference = 'en';
    }
    return $http.get(apiService.getApiUrl() + 'search/online', {
      params: {
        "language": language,
        "lang_preference": lang_preference
      }
  })
  .then(function(result) {
    console.log('findOnlineMatches result: ', result);

    if(result.data.length === 0) {
      vm.searchResults.data = [];
      vm.searchResults.message = localizeService.keys.no_results[lang_preference];
      vm.results_exist = false;
    } else {
      //set result list to empty if new search doesn't return anything
      vm.searchResults.data = result.data;
      vm.searchResults.message = localizeService.keys.yes_results[lang_preference];
      vm.results_exist = true;
    }

  })
  .catch(function(err) {
    console.log('findOnlineMatches err: ', err);
  });
};

//get user profile from search results
vm.goToProfile = userService.goToProfile;

vm.open = userService.open;

// vm.animationsEnabled = true;

// var modalInstance =
// vm.open = function(size) {
//      $uibModal.open({
//       animation: vm.animationsEnabled,
//       // ariaLabelledBy: 'modal-title',
//       // ariaDescribedBy: 'modal-body',
//       templateUrl: './templates/signinmsg.html',
//       size: size,
//       controller: function() {
//         var vm = this;
//
//         vm.ok = function(){
//           console.log('ok invoked');
//           vm.$close();
//         };
//       },
//       controllerAs: 'modal'
//     });
//   };
}]);

app.controller('settingsController', ['searchService', 'userService', function(searchService, userService) {

  var vm = this;

  vm.showForm = !vm.showForm;

  //retrieve cities upon going to view
  vm.getCities = searchService.getCities();
  //list of cities are stored here to be accessed in the view in the select box
  vm.cityList = searchService.cityList;

  vm.getUserInfo = userService.getUserInfo();
  //user information for logged in user saved here
  vm.userData = userService.userData;

  vm.submit = function(form) {
    console.log(form);
  };

  // get data type of select box, not autopopulating
  // vm.doTheStuff = function(){
  //   return typeof vm.userData.data.speaks_language_id;
  // };
}]);

app.controller('messageController', ['messageService', function(messageService) {

  var vm = this;

  vm.threads = messageService.threads;

  vm.getThreads = messageService.getThreads();

}]);

app.controller('myProfileController', ['userService', 'localizeService', function(userService, localizeService) {

  var vm = this;

  //if a user is logged in, retrieve their info
  vm.getUserInfo = userService.getUserInfo();

  //user information for logged in user saved here
  vm.userData = userService.userData;

  //localize page based on user's lang setting
  localizeService.localizeForUser();

}]);

app.controller('loginController', ['loginService', function(loginService) {

  var vm = this;

  //log user in
  vm.login = loginService.login;

  vm.show = false;

  vm.showDemo = function() {
    if(!vm.show) {
      vm.show = true;
    } else {
      vm.show = false;
    }
  };

}]);

app.controller('aboutController', [function() {

  var vm = this;

  

}]);
