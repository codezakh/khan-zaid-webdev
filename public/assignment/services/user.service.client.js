(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", ['$http', function ($http)
    {
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

        var findUserById = function (userId) {
            return _.find(users, ['_id', userId]);
        };

        var findUserByUsername = function(username) {
            return _.find(users, ['username', username]);
        };

        var findUserByCredentials = function(username, password) {
            return _.find(users, {username: username, password: password});
        };

        var updateUser = function(userId, user) {
            var user_to_modify = findUserById(userId);
            return _.assign(user_to_modify, user);
        };


        return {
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser
        };
    }
    ]);
})();
