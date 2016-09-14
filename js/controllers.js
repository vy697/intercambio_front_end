'use strict';

app.controller('landingController', ['localizeService', 'exchangeListService', '$translate', '$http', function(localizeService, exchangeListService, $translate, $http) {

  var vm = this;

  vm.changeLanguage = localizeService.changeLanguage;

  //from service:
  // vm.getExchanges = exchangeListService.getExchanges;

  // vm.exchanges = exchangeListService.exchanges;

  // console.log(vm.exchanges);

  vm.getExchanges = function() {
    $http.get("http://localhost:3000/search")
    .then(function(data) {
      vm.exchanges = data.data;
      console.log('THIS IS THE EXCHANGE DATA: ', vm.exchanges);
    })
    .catch(function(err) {
      console.log('where is my data: ', err);
    });
  }

}]);

app.controller('signupController', [function() {

  var vm = this;


}]);
