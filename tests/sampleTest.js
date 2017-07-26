/**
 * Created by zaidkhan on 7/25/17.
 */

// describe('userController', function () {
//
//     beforeEach(module('WebAppMaker'));
//
//     var $controller;
//
//     beforeEach(inject(function(_$controller_){
//         $controller = _$controller_;
//     }));
//
//     describe('sum', function () {
//         it('1 + 1 should equal 2', function () {
//             var $scope = {};
//             var controller = $controller('loginController', { $scope: $scope });
//             $scope.x = 1;
//             $scope.y = 2;
//             $scope.sum();
//             expect($scope.z).toBe(3);
//         });
//     });
//
// });


describe('UserService', function() {

    var UserService;

    beforeEach(module('WebAppMaker'));

    beforeEach(inject(function(_UserService_){
        UserService = _UserService_;
    }));

    it("should let you find a user by id", function(){
        var user = UserService.findUserById("123");
        expect(user._id).toEqual("123");
    });

    it("should let you find a user by username", function(){
        var user = UserService.findUserByUsername('alice');
        expect(user.username).toEqual('alice');
    });

    it("should let you find a user by credentials", function(){
        var user = UserService.findUserByCredentials("alice", "alice");
        expect(user.username).toEqual('alice');
        expect(user.password).toEqual('alice');
    });

    it("should let you update a user", function(){
       var user = UserService.updateUser("123", {username: "gooliusBoozler"});
       user = UserService.findUserByUsername("gooliusBoozler");
       expect(user).not.toBeUndefined();
       expect(user.username).toEqual("gooliusBoozler");
    });
});


describe('WebsiteService', function(){

    var WebsiteService;
    var userId = "123";

    beforeEach(module('WebAppMaker'));
    beforeEach(inject(function(_WebsiteService_){
        WebsiteService = _WebsiteService_;
    }));

    it("should let you create a website", function(){
        var website = WebsiteService.createWebsite(userId, {
            name: 'Test',
            description: 'Test'
        });

        expect(WebsiteService.findWebsiteById(website._id)).not.toBeUndefined();
    });

    it("should let you find websites by user", function(){
        var websites = WebsiteService.findWebsitesByUser(userId);
        expect(websites.length).toEqual(3);
    });

    it("should let you update websites", function(){
        var website = WebsiteService.createWebsite(userId, {
            name: 'Test',
            description: 'Test'
        });

        WebsiteService.updateWebsite(website._id, {description: "new description"});

        expect(WebsiteService.findWebsiteById(website._id).description)
            .toEqual("new description");
    });

    it("should let you delete websites", function(){
        var website = WebsiteService.createWebsite(userId, {
            name: 'Test',
            description: 'Test'
        });

        WebsiteService.deleteWebsite(website._id);

        expect(WebsiteService.findWebsiteById(website._id)).toBeUndefined();
    });

});

describe('PageService', function(){

    var PageService;
    var websiteId = "456";

    beforeEach(module('WebAppMaker'));
    beforeEach(inject(function(_PageService_){
        PageService = _PageService_;
    }));

    it("should let you create a page", function(){
        var page = PageService.createPage("1337", {
            name: "test",
            description: "test"
        });

        expect(PageService.findPageById(page._id)).not.toBeUndefined();
    });

    it("should let you find pages by website id", function(){
        var pages = PageService.findPageByWebsiteId(websiteId);
        expect(pages.length).toEqual(3);
    });

    it("should let you update a page", function(){
        var page = PageService.createPage("1337", {
            name: "test",
            description: "test"
        });

        PageService.updatePage(page._id, {description: "new description"});

        page = PageService.findPageById(page._id);
        expect(page.description).toEqual("new description");
    });

    it("should let you delete a page", function(){
        var page = PageService.createPage("1337", {
            name: "test",
            description: "test"
        });

        PageService.deletePage(page._id);
        expect(PageService.findPageById(page._id)).toBeUndefined();
    })

});

describe('WidgetService', function(){

    var WidgetService;
    var pageId = "321";

    beforeEach(module('WebAppMaker'));
    beforeEach(inject(function(_WidgetService_){
        WidgetService = _WidgetService_;
    }));

    it("should let you create a widget", function(){
        var widget = WidgetService.createWidget("7331", {
            widgetType: "test",
            size: "1337",
            text: "test"
        });

        expect(WidgetService.findWidgetById(widget._id)).not.toBeUndefined();
    });

    it("should let you find a widget by page id", function(){
        var widgets = WidgetService.findWidgetsByPageId(pageId);
        expect(widgets.length).toEqual(7);
    });

    it("should let you update a widget", function(){
        var widget = WidgetService.createWidget("7331", {
            widgetType: "test",
            size: "1337",
            text: "test"
        });

        WidgetService.updateWidget(widget._id, {text: "new text"});

        expect(WidgetService.findWidgetById(widget._id).text).toEqual("new text");
    });

    it("should let you delete a widget", function(){
        var widget = WidgetService.createWidget("7331", {
            widgetType: "test",
            size: "1337",
            text: "test"
        });

        expect(WidgetService.findWidgetById(widget._id)).not.toBeUndefined();
        WidgetService.deleteWidget(widget._id);
        expect(WidgetService.findWidgetById(widget._id)).toBeUndefined();
    })

});
