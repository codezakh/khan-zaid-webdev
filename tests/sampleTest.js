/**
 * Created by zaidkhan on 7/25/17.
 */

describe('userController', function () {

    beforeEach(module('WebAppMaker'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    describe('sum', function () {
        it('1 + 1 should equal 2', function () {
            var $scope = {};
            var controller = $controller('loginController', { $scope: $scope });
            $scope.x = 1;
            $scope.y = 2;
            $scope.sum();
            expect($scope.z).toBe(3);
        });
    });

});


describe('UserService', function() {

    var UserService;

    beforeEach(module('WebAppMaker'));

    beforeEach(inject(function(_UserService_){
        UserService = _UserService_;
    }));

    it("should do something", function(){
        expect(UserService.sprongle()).toEqual(1);
    })
});