(function() {
    var app = angular.module("WebAppMaker");
    app.controller('WebsiteEditController', function (WebsiteService, $location, $routeParams, $route) {
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

        model.delete = function(){
            WebsiteService.deleteWebsite(model.websiteId);
            model.websites = WebsiteService.findWebsitesByUser(model.userId);
            $location.path('/user/' + model.userId + '/website');
        }

    });
})();
