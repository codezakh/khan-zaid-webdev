(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", [function(){
           var minisprongle = 2;
           var sprongle = function(){
               return minisprongle;
           }
           return {sprongle: sprongle};
        }
        ]);
})();
