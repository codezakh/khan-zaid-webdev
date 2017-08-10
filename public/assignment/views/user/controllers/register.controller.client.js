(function() {
  var app = angular.module("WebAppMaker");
  app.controller('RegisterController', function(UserService, $location){
    var model = this;
    model.registerUser = function(){
      console.log('i was clicked')
       UserService
        .createUser(model.user)
        .then(function(response){
          let user = response.data
          if (user) {
            $location.path('/user/'+user._id);
          } else {
            model.badCredentials = true;
          }
        });
    };
  });
})();
