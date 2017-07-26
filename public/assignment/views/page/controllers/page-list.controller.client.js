(function() {
    var app = angular.module("WebAppMaker");
    app.controller('PageListController', function (PageService, $location, $routeParams) {
        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pages = PageService.findPageByWebsiteId(model.websiteId);
        console.log(model.pages)

    });
})();
