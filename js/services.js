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
