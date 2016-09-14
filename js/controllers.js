'use strict';

app.controller('landingController', ['localizeService', 'exchangeListService', '$translate', function(localizeService, exchangeListService, $translate) {

  var vm = this;

  vm.changeLanguage = localizeService.changeLanguage;

  vm.exchanges;

  vm.getExchanges = exchangeListService.getExchanges()
    .then(function(data) {
      vm.exchanges = data.data;
      console.log('THIS IS THE EXCHANGE DATA: ', vm.exchanges);
    })
    .catch(function(err) {
      console.log('where is my data: ', err);
    });

  // vm.getPosts = postService.getPosts()
  //   .then(function(response) {
  //   vm.posts = response.data.data;
  //   vm.postId = response.data.data.id;
  //   console.log('THESE ARE THE POSTS: ',response.data.data);
  //   })
  //   .catch(function(err) {
  //   console.log('Where are my posts: ', err);
  //   });

}]);

app.controller('signupController', [function() {

  var vm = this;


}]);
