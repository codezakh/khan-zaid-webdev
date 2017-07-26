(function() {
    var app = angular.module("WebAppMaker");
    app.controller('PageEditController', function (PageService, $location, $routeParams, $route) {
        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];

        var init = function(){
            model.page = PageService.findPageById(model.pageId);
        };

        init();

        model.update = function(){
            PageService.updatePage(model.pageId, model.page);
            model.pageUpdated = true;
        };

        model.delete = function(){
            PageService.deletePage(model.pageId);
            $location.path('/user/' + model.userId + '/website/'
                + model.websiteId + '/page');
        }

    });
})();
