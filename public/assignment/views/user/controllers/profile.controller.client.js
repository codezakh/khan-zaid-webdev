(function() {
    var app = angular.module("WebAppMaker");
    app.controller('ProfileController', function (UserService, $location, $routeParams, $route) {

        var model = this;
        model.userId = $routeParams['uid'];

        var init = function () {
            model.user = UserService.findUserById(model.userId);
        };
        init();

        model.update = function(){
            UserService.updateUser(model.userId, model.user);
            model.profileUpdated = true;
        };
    });
})();
