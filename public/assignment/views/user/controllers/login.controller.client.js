(function() {
    var app = angular.module("WebAppMaker");
    app.controller('LoginController', function(UserService, $location){
        var model = this;
        model.submit = function(){
            var user = UserService
                .findUserByCredentials(model.user.username, model.user.password)
              .then(function(response){
                let user = response.data
                if (user) {
                  $location.path('/user/'+user._id);
                } else {
                  model.badCredentials = true;
                }
              });
        }
        model.register = function(){
            $location.path('/register');
        }
    });
})();
