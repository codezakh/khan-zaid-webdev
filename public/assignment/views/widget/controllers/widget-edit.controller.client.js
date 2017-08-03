(function () {
  var app = angular.module("WebAppMaker");
  app.controller('WidgetEditController', function (WidgetService, $location, $routeParams, $sce) {
    var model = this;
    model.userId = $routeParams['uid'];
    model.websiteId = $routeParams['wid'];
    model.pageId = $routeParams['pid'];
    model.widgetId = $routeParams['wgid'];

    var init = function () {
      WidgetService.findWidgetById(model.widgetId)
        .then(function (response) {
          model.widget = response.data;
        });

    };

    init();

    model.update = function () {
      WidgetService.updateWidget(model.widgetId, model.widget)
        .then(function(response){
          $location.path('/user/' + model.userId + '/website/'
            + model.websiteId + '/page/' + model.pageId + '/widget');
        });
    };

    model.delete = function () {
      WidgetService.deleteWidget(model.widgetId)
        .then(function(response){
          $location.path('/user/' + model.userId + '/website/'
            + model.websiteId + '/page/' + model.pageId + '/widget');
        });
    };
  });
})();
