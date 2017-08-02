(function () {
  angular
    .module("WebAppMaker")
    .factory("UserService", ['$http', function ($http) {
      var api = {
        findUserById: undefined,
        findUserByUsername: undefined,
        findUserByCredentials: undefined,
        updateUser: undefined,
        createUser: undefined
      };

      api.findUserById = function (userId) {
        return $http.get(`/api/user/${userId}`);
      };

      api.findUserByUsername = function (username) {
        return $http.get(`/api/user?username=${username}`);
      };

      api.findUserByCredentials = function (username, password) {
        return $http.get(`/api/user?username=${username}&password=${password}`);
      };

      api.updateUser = function (userId, user) {
        return $http.put(`/api/user/${userId}`, user);
      };

      api.createUser = function(user) {
        return $http.post('/api/user', user);
      };

      return api;
    }
    ]);
})();
