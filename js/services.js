'use strict';

app.service('localizeService', ['$translate', function($translate){

  var sv = this;

  sv.changeLanguage = function(key) {
    $translate.use(key);
  };

}]);

// app.controller("controller",['$http', function($http){
//   var vm = this;
//   $http.get("https://itunes.apple.com/search?term=jack+johnson")
//   .then(function(data){
//     console.log(data.data);
//   })
//   .catch(console.log);
// }])

app.service('exchangeListService', ['$http', function($http) {

  var sv = this;

  sv.exchanges = [];

  sv.getExchanges = function() {
    return $http.get("http://localhost:3000/search");
  };


  // $http.get("http://localhost:3000/search")
  // .then(function(data) {
  //   console.log(data);
  // })
  // .catch(function(err) {
  //   console.log(err);
  // });

}]);

// app.service('teaService', ['$http', function($http) {
//
//   var self = this;
//   self.teas = [];
//   self.order = [];
//
//   this.getTeas = function() {
//     return $http.get('tea.json');
//  };
//
//  this.addTea = function(tea) {
//    console.log(tea);
//  };
// }]);
