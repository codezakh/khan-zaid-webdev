(function () {
  var app = angular.module("WebAppMaker");
  app.controller('WebsiteNewController', function (WebsiteService, $location, $routeParams) {
    var model = this;
    model.userId = $routeParams['uid'];
    WebsiteService.findWebsitesByUser(model.userId)
      .then(function (response) {
        model.websites = response.data;
      });

    model.new = function () {
      var newsite = WebsiteService.createWebsite(model.userId, model.website)
        .then(function(response){
          let newsite = response.data;
          $location.path('/user/' + model.userId + '/website/' + newsite._id);
        })
    };

  });
})();
