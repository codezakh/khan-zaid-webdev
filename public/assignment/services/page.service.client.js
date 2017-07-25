(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", ['$http', function ($http)
        {

            var api = {
                createPage: undefined,
                findPageByWebsiteId: undefined,
                findPageById: undefined,
                updatePage:undefined,
                deletePage: undefined
            };

            var pages = [
                {
                    "_id": "321",
                    "name": "Post 1",
                    "websiteId": "456",
                    "description": "Lorem"
                },
                {
                    "_id": "432",
                    "name": "Post 2",
                    "websiteId": "456",
                    "description": "Lorem"
                },
                {
                    "_id": "543",
                    "name": "Post 3",
                    "websiteId": "456",
                    "description": "Lorem"
                }
            ];

            api.findPageById = function(pageId){
                return _.find(pages, ['_id', pageId]);
            };

            api.createPage = function(websiteId, page){
                _.assign(page, {
                    websiteId: websiteId,
                    _id: "hardcoded id for now"
                });

                pages.push(page);

                return page
            };

            api.findPageByWebsiteId = function(websiteId){
                return _.filter(pages, ['websiteId', websiteId]);
            };

            api.updatePage = function(pageId, page){
                page_to_update = api.findPageById(pageId);
                _.assign(page_to_update, page);
                return page_to_update;
            };

            api.deletePage = function(pageId){
                var pageIdx = _.findIndex(pages, ['_id', pageId]);
                pages.pop(pageIdx);
            };

            return api;
        }
        ]);
})();
