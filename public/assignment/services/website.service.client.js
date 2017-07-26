(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", ['$http', function ($http)
        {

            var api = {
                createWebsite: undefined,
                findWebsitesByUser: undefined,
                findWebsiteById: undefined,
                updateWebsite:undefined,
                deleteWebsite: undefined
            };
            var websites =
                [
                    {
                        "_id": "123",
                        "name": "Facebook",
                        "developerId": "456",
                        "description": "Lorem"
                    },
                    {
                        "_id": "234",
                        "name": "Tweeter",
                        "developerId": "456",
                        "description": "Lorem"
                    },
                    {
                        "_id": "456",
                        "name": "Gizmodo",
                        "developerId": "456",
                        "description": "Lorem"
                    },
                    {
                        "_id": "890",
                        "name": "Go",
                        "developerId": "123",
                        "description": "Lorem"
                    },
                    {
                        "_id": "567",
                        "name": "Tic Tac Toe",
                        "developerId": "123",
                        "description": "Lorem"
                    },
                    {
                        "_id": "678",
                        "name": "Checkers",
                        "developerId": "123",
                        "description": "Lorem"
                    },
                    {
                        "_id": "789",
                        "name": "Chess",
                        "developerId": "234",
                        "description": "Lorem"
                    }
                ];


            api.findWebsiteById = function (userId) {
                return _.find(websites, ['_id', userId]);
            };


            api.createWebsite = function(userId, website){
                _.assign(website, {_id: "randomIdForNow", developerId: userId});
                websites.push(website);
                return website;
            };

            api.findWebsitesByUser = function(userId){
                return _.filter(websites, ['developerId', userId]);
            };

            api.updateWebsite = function(websiteId, website){
                var website_to_update = api.findWebsiteById(websiteId);
                _.assign(website_to_update, website);
                return website_to_update
            };

            api.deleteWebsite = function(websiteId){
                var websiteIdx = _.findIndex(websites, ['_id', websiteId]);
                websites.splice(websiteIdx, 1);
            };

            return api;
        }
        ]);
})();
