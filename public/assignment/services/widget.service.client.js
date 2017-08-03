(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", ['$http', function ($http)
        {

            var api = {
                createWidget: undefined,
                findWidgetsByPageId: undefined,
                findWidgetById: undefined,
                updateWidget:undefined,
                deleteWidget: undefined
            };


            api.findWidgetById = function(widgetId){
                return $http.get(`/api/widget/${widgetId}`);
            };

            api.createWidget = function(pageId, widget){
              return $http.post(`/api/page/${pageId}/widget`, widget);
            };

            api.findWidgetsByPageId = function(pageId){
              return $http.get(`/api/page/${pageId}/widget`);
            };

            api.updateWidget = function(widgetId, widget){
              return $http.put(`/api/widget/${widgetId}`, widget);
            };

            api.deleteWidget = function(widgetId){
              return $http.delete(`/api/widget/${widgetId}`);
            };

            return api;
        }
        ]);
})();
