(function () {
  var app = angular.module("WebAppMaker");
  app.controller('PageEditController', function (PageService, $location, $routeParams, $route) {
    var model = this;
    model.userId = $routeParams['uid'];
    model.websiteId = $routeParams['wid'];
    model.pageId = $routeParams['pid'];

    var init = function () {
      PageService.findPageById(model.pageId)
        .then(function (response) {
          model.page = response.data;
        })
    };

    init();

    model.update = function () {
      PageService.updatePage(model.pageId, model.page)
        .then(function (response) {
          model.pageUpdated = true;
        });
    };

    model.delete = function () {
      PageService.deletePage(model.pageId)
        .then(function (response) {
          $location.path('/user/' + model.userId + '/website/'
            + model.websiteId + '/page');
        });
    };

  });
})();
