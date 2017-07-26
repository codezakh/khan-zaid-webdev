(function() {
    var app = angular.module("WebAppMaker");
    app.controller('WebsiteNewController', function (WebsiteService, $location, $routeParams) {
        var model = this;
        model.userId = $routeParams['uid'];
        model.websites = WebsiteService.findWebsitesByUser(model.userId);

        model.new = function(){
            var newsite = WebsiteService.createWebsite(model.userId, model.website);
            $location.path('/user/' + model.userId + '/website/' + newsite._id);
        }

    });
})();
