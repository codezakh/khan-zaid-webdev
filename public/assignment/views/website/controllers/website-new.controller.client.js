(function() {
    var app = angular.module("WebAppMaker");
    app.controller('WebsiteNewController', function (WebsiteService, $location, $routeParams) {
        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.websites = WebsiteService.findWebsitesByUser(model.userId);

        var init = function(){
            model.website = WebsiteService.findWebsiteById(model.websiteId);
        }

        init()

        model.update = function(){
            WebsiteService.updateWebsite(model.websiteId, model.website);
            model.websiteUpdated = true;
        }

    });
})();
