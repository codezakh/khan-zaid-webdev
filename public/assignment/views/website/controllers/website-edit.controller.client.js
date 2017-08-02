(function () {
  var app = angular.module("WebAppMaker");
  app.controller('WebsiteEditController', function (WebsiteService, $location, $routeParams, $route) {
    var model = this;
    model.userId = $routeParams['uid'];
    model.websiteId = $routeParams['wid'];
    WebsiteService.findWebsitesByUser(model.userId)
      .then(function (response) {
        model.websites = response.data;
      });

    var init = function () {
      WebsiteService.findWebsiteById(model.websiteId)
        .then(function(response){
          model.website = response.data;
        })
    };

    init();

    model.update = function () {
      WebsiteService.updateWebsite(model.websiteId, model.website)
        .then(function(response){
          model.websiteUpdated = true;
        });
    };

    model.delete = function () {
      WebsiteService.deleteWebsite(model.websiteId)
        .then(function(response){
          model.websites = WebsiteService.findWebsitesByUser(model.userId);
          $location.path('/user/' + model.userId + '/website');
        });
    }

  });
})();
