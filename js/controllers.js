'use strict';

app.controller('landingController', ['localizeService', 'exchangeListService', '$translate', '$http', '$window', '$location', function(localizeService, exchangeListService, $translate, $http, $window, $location) {

  var vm = this;

  vm.changeLanguage = localizeService.changeLanguage;

  vm.getExchanges = function() {
    $http.get("http://localhost:3000/search")
    .then(function(data) {
      vm.exchanges = data.data;
      console.log('THIS IS THE EXCHANGE DATA: ', vm.exchanges);
    })
    .catch(function(err) {
      console.log('where is my data: ', err);
    });
  };

  vm.login = function(email, password) {
    return $http.post('http://localhost:3000/auth', {
      email: email,
      pw: password
    })
    .then(function(result) {
      console.log('login result:', result);
      $window.sessionStorage.token = result.data.token;

      $location.url('/home');

      vm.message = 'Login successful';
    })
    .catch(function(err) {
      console.log('login error: ', err);
      delete $window.sessionStorage.token;
      vm.message = 'Not able to login'
    });
  };

}]);

app.controller('signupController', ['$http', function($http) {

  var vm = this;

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
      console.log('SIGNUP ERROR:', err);
    });
  };
}]);

app.controller('profileController', [function() {

  var vm = this;

  vm.message = 'PROFILE CONTROLLER';

}]);

app.controller('homeController', [function() {

  var vm = this;

  vm.message = 'homeController!!'
}]);

app.controller('indexController', ['logoutService', function(logoutService) {


  var vm = this;

  logoutService.showLogOutFunc();

  vm.logout = logoutService.logout;

  vm.showLogout = logoutService.showLogout;


}]);
