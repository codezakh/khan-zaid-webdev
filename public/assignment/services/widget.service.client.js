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

            var widgets = [
                {
                    "_id": "123",
                    "widgetType": "HEADING",
                    "pageId": "321",
                    "size": 2,
                    "text": "GIZMODO"
                },
                {
                    "_id": "234",
                    "widgetType": "HEADING",
                    "pageId": "321",
                    "size": 4,
                    "text": "Lorem ipsum"
                },
                {
                    "_id": "345",
                    "widgetType": "IMAGE",
                    "pageId": "321",
                    "width": "100%",
                    "url": "http://lorempixel.com/400/200/"
                },
                {
                    "_id": "456",
                    "widgetType": "HTML",
                    "pageId": "321",
                    "text": "<p>Lorem ipsum</p>"
                },
                {
                    "_id": "567",
                    "widgetType": "HEADING",
                    "pageId": "321",
                    "size": 4,
                    "text": "Lorem ipsum"
                },
                {
                    "_id": "678",
                    "widgetType": "YOUTUBE",
                    "pageId": "321",
                    "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E"
                },
                {
                    "_id": "789",
                    "widgetType": "HTML",
                    "pageId": "321",
                    "text": "<p>Lorem ipsum</p>"
                }
            ];

            api.findWidgetById = function(widgetId){
                return _.find(widgets, ['_id', widgetId]);
            };

            api.createWidget = function(pageId, widget){
                _.assign(widget, {pageId: pageId, _id: "placeholder id"});
                widgets.push(widget);
                return widget;
            };

            api.findWidgetsByPageId = function(pageId){
                return _.filter(widgets, ['pageId', pageId]);
            };

            api.updateWidget = function(widgetId, widget){
                var widget_to_update = api.findWidgetById(widgetId);
                _.assign(widget_to_update, widget);
                return widget_to_update;
            };

            api.deleteWidget = function(widgetId){
                var widgetIdx = _.findIndex(widgets, ['_id', widgetId]);
                widgets.splice(widgetIdx, 1);
            };

            return api;
        }
        ]);
})();
