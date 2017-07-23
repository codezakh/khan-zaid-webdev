/**
 * Created by zaidkhan on 7/21/17.
 */

var WebAppMaker = angular.module('WebAppMaker', ['ngRoute']);

router = function($routeProvider) {
    $routeProvider
        .when('/',
            {templateUrl: "views/user/login.html"}
        )
        .otherwise(
            {template: 'just kill me'}
        )
};

WebAppMaker.config(["$routeProvider", router]);


WebAppMaker.controller('ReflectController', ['$scope', function($scope){
    $scope.reflect = function(reflectThis) {
        if (reflectThis === undefined) return "";
        return reflectThis + "|" + reflectThis.split("").reverse().join("")
    };
}]);

loginController = function($scope) {
    console.log("Hello from loginController");
};
WebAppMaker.controller("loginController", ["$scope", loginController]);


