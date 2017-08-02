(function () {
  var app = angular.module("WebAppMaker");
  app.controller('ProfileController', function (UserService, $location, $routeParams, $http) {

    var model = this;
    model.userId = $routeParams['uid'];


    var init = function () {
      // model.user = UserService.findUserById(model.userId);
      UserService.findUserById(model.userId)
        .then(function(response){
          model.user = response.data;
        });

    };
    init();

    model.update = function () {
      UserService.updateUser(model.userId, model.user)
        .then(function(response){
          model.profileUpdated = true;
        });
    };

    model.deleteProfile = function(){
      UserService.deleteUser(model.userId)
        .then(function(response){
          $location.path('/login');
        })
    };

    model.createProfile = function(){
      UserService.createUser(model.userId, model.user)
        .then(function(response){
          let user = response.data
          $location.path('/user/' + user._id);
        })
    }
  });
})();
