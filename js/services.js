'use strict';

app.service('localizeService', ['$translate', function($translate){

  var sv = this;

  sv.changeLanguage = function(key) {
    $translate.use(key);
  };

}]);


app.service('exchangeListService', ['$http', function($http) {

  var sv = this;

  sv.exchanges = {};

  // sv.getExchanges = function() {
  //   return $http.get("http://localhost:3000/search");
  // };

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

    $location.url('/');

    sv.message = 'successfully logged out';
  };

}]);
