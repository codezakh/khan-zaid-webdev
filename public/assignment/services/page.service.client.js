(function () {
  angular
    .module("WebAppMaker")
    .factory("PageService", ['$http', function ($http) {

      var api = {
        createPage: undefined,
        findPageByWebsiteId: undefined,
        findPageById: undefined,
        updatePage: undefined,
        deletePage: undefined
      };

      api.findPageById = function (pageId) {
        return $http.get(`/api/page/${pageId}`)
      };

      api.createPage = function (websiteId, page) {
        return $http.post(`/api/website/${websiteId}/page`, page);
      };

      api.findPageByWebsiteId = function (websiteId) {
        return $http.get(`/api/website/${websiteId}/page`);
      };

      api.updatePage = function (pageId, page) {
        return $http.put(`/api/page/${pageId}`, page);
      };

      api.deletePage = function (pageId) {
        $http.delete(`/api/page/${pageId}`);
      };

      return api;
    }
    ]);
})();
