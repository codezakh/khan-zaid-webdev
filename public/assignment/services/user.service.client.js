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
      var users = [
        {
          _id: "123",
          username: "alice",
          password: "alice",
          firstName: "Alice",
          lastName: "Wonder"
        },
        {
          _id: "234",
          username: "bob",
          password: "bob",
          firstName: "Bob",
          lastName: "Marley"
        },
        {
          _id: "345",
          username: "charly",
          password: "charly",
          firstName: "Charly",
          lastName: "Garcia"
        },
        {
          _id: "456",
          username: "jannunzi",
          password: "jannunzi",
          firstName: "Jose",
          lastName: "Annunzi"
        }
      ];

      api.findUserById = function (userId) {
        return _.find(users, ['_id', userId]);
      };

      api.findUserByUsername = function (username) {
        return _.find(users, ['username', username]);
      };

      api.findUserByCredentials = function (username, password) {
        return _.find(users, {username: username, password: password});
      };

      api.updateUser = function (userId, user) {
        var user_to_modify = api.findUserById(userId);
        return _.assign(user_to_modify, user);
      };

      api.createUser = function(user) {
        user._id = String(Number(_.last(users)._id) + 1);
        users.push(user);
        return user;
      };

      return api;
    }
    ]);
})();
