(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", ['$http', function ($http)
    {
        var minisprongle = 2;
        var sprongle = function () {
            return minisprongle;
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

        var findUserById = function (userId) {
            return _.find(users, ['_id', userId]);
        };


        return {
            sprongle: sprongle,
            findUserById: findUserById,
        };
    }
    ])
    ;
})();
