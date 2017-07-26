/**
 * Created by zaidkhan on 7/26/17.
 */
(function() {
    var app = angular.module("WebAppMaker");
    app.controller('WidgetEditController', function (WidgetService, $location, $routeParams, $sce) {
        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];
        model.widgetId = $routeParams['wgid'];

        var init = function () {
            model.widget = WidgetService.findWidgetById(model.widgetId);

        };

        init();

        model.update = function(){
            WidgetService.updateWidget(model.widgetId, model.widget);
            $location.path('/user/' + model.userId + '/website/'
                + model.websiteId + '/page/' + model.pageId + '/widget');
        };

        model.delete = function(){
            WidgetService.deleteWidget(model.widgetId);
            $location.path('/user/' + model.userId + '/website/'
                + model.websiteId + '/page/' + model.pageId + '/widget');
        }
    });
})();
