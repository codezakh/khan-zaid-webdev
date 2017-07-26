(function() {
    var app = angular.module("WebAppMaker");
    app.controller('WebsiteListController', function (WebsiteService, $location, $routeParams) {

        var model = this;
        model.userId = $routeParams['uid'];
        model.websites = WebsiteService.findWebsitesByUser(model.userId);

    });
})();
