(function () {
  var app = angular.module("WebAppMaker");
  app.controller('WebsiteListController', function (WebsiteService, $location, $routeParams) {

    var model = this;
    model.userId = $routeParams['uid'];
    WebsiteService.findWebsitesByUser(model.userId)
      .then(function (response) {
        model.websites = response.data;
      })

  });
})();
