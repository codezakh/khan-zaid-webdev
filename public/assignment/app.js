/**
 * Created by zaidkhan on 7/21/17.
 */

var WebAppMaker = angular.module('WebAppMaker', ['ngRoute']);

router = function($routeProvider) {
    $routeProvider
        .when(
            '/',
            {templateUrl: "views/user/login.view.client.html"}
        )
        .when(
            '/login',
            {templateUrl: "views/user/login.view.client.html"}
        )
        .when(
            '/register',
            {templateUrl: "views/user/register.view.client.html"}
        )
        .when(
            '/user/:uid',
            {templateUrl: "views/user/profile.view.client.html"}
        )
        .when(
            '/user/:uid/website',
            {templateUrl: "views/website/website-list.view.client.html"}
        )
        .when(
            '/user/:uid/website/new',
            {templateUrl: "views/website/website-new.view.client.html"}
        )
        .when(
            '/user/:uid/website/:wid',
            {templateUrl: "views/website/website-edit.view.client.html"}
        )
        .otherwise(
            {templateUrl: 'views/user/login.view.client.html'}
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


