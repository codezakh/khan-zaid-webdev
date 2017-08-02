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

            api.findWebsiteById = function (websiteId) {
                return $http.get(`/api/website/${websiteId}`);
            };


            api.createWebsite = function(userId, website){
              return $http.post(`/api/user/${userId}/website`, website);
            };

            api.findWebsitesByUser = function(userId){
              return $http.get(`/api/user/${userId}/website`);
            };

            api.updateWebsite = function(websiteId, website){
              return $http.put(`/api/website/${websiteId}`, website)
            };

            api.deleteWebsite = function(websiteId){
              return $http.delete(`/api/website/${websiteId}`);
            };

            return api;
        }
        ]);
})();
