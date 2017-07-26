(function() {
    var app = angular.module("WebAppMaker");
    app.controller('WidgetListController', function (WidgetService, $location, $routeParams, $sce) {
        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];
        model.widgets = WidgetService.findWidgetsByPageId(model.pageId);
        model.noWidgetsWarning= false;
        if (model.widgets.length == 0){
            model.noWidgetsWarning = true;
        }

        model.trustHtmlContent = function(content){
            return $sce.trustAsHtml(content)
        }

        model.trustUrlResource = function(resource){
            var youtubeUrl = "https://www.youtube.com/embed/";
            var urlParts = resource.split('/');
            youtubeUrl += urlParts.pop();
            return $sce.trustAsResourceUrl(youtubeUrl);

        }
    });
})();
