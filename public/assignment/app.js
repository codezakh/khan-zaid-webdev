/**
 * Created by zaidkhan on 7/21/17.
 */

var WebAppMaker = angular.module('WebAppMaker', ['ngRoute']);
WebAppMaker.controller('ReflectController', ['$scope', function($scope){
    $scope.reflect = function(reflectThis) {
        if (reflectThis === undefined) return "";
        return reflectThis + "|" + reflectThis.split("").reverse().join("")
    };
}]);

