(function () {
  var app = angular.module("WebAppMaker");
  app.controller('PageListController', function (PageService, $location, $routeParams) {
    var model = this;
    model.userId = $routeParams['uid'];
    model.websiteId = $routeParams['wid'];
    PageService.findPageByWebsiteId(model.websiteId)
      .then(function (response) {
        model.pages = response.data;
        model.noPagesWarning = false;
        if (model.pages.length == 0) {
          model.noPagesWarning = true;
        }
      });

  });
})();
