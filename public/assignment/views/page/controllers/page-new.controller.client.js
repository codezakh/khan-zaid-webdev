(function () {
  var app = angular.module("WebAppMaker");
  app.controller('PageNewController', function (PageService, $location, $routeParams) {
    var model = this;
    model.userId = $routeParams['uid'];
    model.websiteId = $routeParams['wid'];

    model.new = function () {
      var newPage = PageService.createPage(model.websiteId, model.page)
        .then(function (response) {
          let newPage = response.data;
          $location.path('/user/' + model.userId + '/website/' + model.websiteId
            + '/page/' + newPage._id);
        });
    };

  });
})();
