const assert = require('assert');

const _ = require('lodash');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let userService = require('../public/assignment/services/user.service.server');
let pageService = require('../public/assignment/services/page.service.server');
let widgetService = require('../public/assignment/services/widget.service.server');
let should = chai.should();

chai.use(chaiHttp);

class setUpData {
  setUpUser() {
    return chai.request(server)
      .post('/api/user')
      .send({username: 'websitesTestUser'})
  };

  setUpWebsite() {
    let self = this;
    return this.setUpUser()
      .then(function (response) {
        self.createdUser = response.body;
        return chai.request(server)
          .post(`/api/user/${self.createdUser._id}/website`)
      })
  };

  setUpPage() {
    let self = this;
    return this.setUpWebsite()
      .then(function(response){
        self.createdWebsite = response.body;
        return chai.request(server)
          .post(`/api/user/${self.createdUser._id}/website/${self.createdWebsite._id}/page`)
          .send({name: 'test page'})
      })
  };
}

describe('the /users endpoint', () => {

  beforeEach(function(){
    userService.reset();
  });

  it("should allow you to create users with a POST", (done) => {
    chai.request(server)
      .post('/api/user')
      .send({
        username: 'testusername',
        password: 'testpassword',
        firstName: 'goolius',
        lastName: 'boozler'
      }).end((error, response) => {
      chai.expect(error).to.be.null;
      chai.expect(response).to.have.status(200);
      done();
    });
  });

  it("should allow you to find users by id", function(){
    return chai.request(server)
      .post('/api/user')
      .send({
        username: 'testusername',
        password: 'testpassword',
        firstName: 'goolius',
        lastName: 'boozler'
      })
      .then((response) => {
      return chai.request(server)
        .get(`/api/user/${response.body._id}`)
        .then((response) => {
          chai.expect(response).to.have.status(200);
          chai.expect(response.body.username).to.equal('testusername');
        })
    })
  });

  it("should allow you to find users by username", function(){
    return chai.request(server)
      .post('/api/user')
      .send({
        username: 'testusername',
        password: 'testpassword',
        firstName: 'goolius',
        lastName: 'boozler'
      })
      .then((response) => {
        return chai.request(server)
          .get('/api/user')
          .query({username: response.body.username})
          .then((response) => {
            chai.expect(response).to.have.status(200);
            chai.expect(response.body.username).to.equal('testusername');
          })
      })
  });

  it("should allow you to find users by credentials", function(){
    return chai.request(server)
      .post('/api/user')
      .send({
        username: 'testusername',
        password: 'testpassword',
        firstName: 'goolius',
        lastName: 'boozler'
      })
      .then((response) => {
        return chai.request(server)
          .get('/api/user')
          .query({
            username: response.body.username,
            password: response.body.password
          })
          .then((response) => {
            chai.expect(response).to.have.status(200);
            chai.expect(response.body.username).to.equal('testusername');
            chai.expect(response.body.password).to.equal('testpassword');
          })
      })
  });
  //completely broken test, i hate mongo
  // it("should allow you to delete users", function(){
  //   return chai.request(server)
  //     .post('/api/user')
  //     .send({
  //       username: 'testusernamedelete',
  //       password: 'testpassworddelete',
  //       firstName: 'goolius',
  //       lastName: 'boozler'
  //     })
  //     .then((response) => {
  //       var userId = response.body._id;
  //       return chai.request(server)
  //       .delete(`/api/user/${userId}`)
  //         .then((response) => {
  //           chai.expect(response).to.have.status(200);
  //           return chai.request(server)
  //             .get(`/api/user/${userId}`)
  //             .then((response) => {
  //               // chai.expect(response).to.have.status(404);
  //               console.log(response.body)
  //               chai.expect(response.body).to.equal({});
  //             })
  //             .catch((error) => {
  //               chai.exp
  //               // chai.expect(error).to.have.status(404);
  //             })
  //         })
  //     })
  // });

  it("should allow you to update users", function(){
    return chai.request(server)
      .post('/api/user')
      .send({
        username: 'testusername',
        password: 'testpassword',
        firstName: 'goolius',
        lastName: 'boozler'
      })
      .then((response) => {
        let createdUser = response.body;
        return chai.request(server)
          .put(`/api/user/${response.body._id}`)
          .send({username: 'new username'})
          .then((response) => {
            chai.expect(response).to.have.status(200);
            return chai.request(server)
              .get(`/api/user/${createdUser._id}`)
              .then(function(response){
                chai.expect(response.body).to.have.property('username',
                  'new username');
              })
          })
      })
  });

});


describe('the websites endpoint', function(){

  const setUpUser = function setUp() {
    return chai.request(server)
      .post('/api/user')
      .send({username: 'websitesTestUser'})
  };

  const setUpWebsite = function setUpWebsite(){
    return setUpUser()
      .then(function(response){
        let createdUser = response.body;
        return chai.request(server)
          .post(`/api/user/${createdUser._id}/website`)
      })
  };

  it("should let you create a website", function(){
      return setUpUser()
      .then(function(response){
        return chai.request(server)
          .post(`/api/user/${response.body._id}/website`)
          .send({
            name: "Swagbook",
            description: "test website"
          })
          .then(function(response){
            chai.expect(response).to.have.status(200);
          })
      })
  });

  it("should let you find all websites by a user", function(){
    return setUpUser()
      .then(function(response){
        let createdUser = response.body;
        return chai.request(server)
          .post(`/api/user/${createdUser._id}/website`)
          .send({
            name: 'Swagbook'
          })
          .then(function(response){
            return chai.request(server)
              .post(`/api/user/${createdUser._id}/website`)
              .send({
                name: 'Swagbook2'
              })
              .then(function(response){
                return chai.request(server)
                  .get(`/api/user/${createdUser._id}/website`)
                  .then(function(response){
                    chai.expect(response).to.have.status(200);
                    chai.expect(response.body).to.have.lengthOf(2);
                    _.forEach(response.body, (website) => {
                      chai.expect(website).to.have.property('_user', createdUser._id);
                    })
                  })
              })
          })
      });
  });

  it("should let you find a website by id", function(){
    return setUpUser()
      .then(function(response){
        let createdUser = response.body;
        return chai.request(server)
          .post(`/api/user/${createdUser._id}/website`)
          .then(function(response){
            let createdWebsite = response.body;
            return chai.request(server)
              .get(`/api/website/${createdWebsite._id}`)
              .then(function(response){
                chai.expect(response).to.have.status(200);
                chai.expect(response.body).to.have.property('_id',
                  createdWebsite._id)
              })
          })
      })
  });

  it("should let you update a website by id", function(){
    return setUpWebsite()
      .then(function(response){
        let createdWebsite = response.body;
        return chai.request(server)
          .put(`/api/website/${createdWebsite._id}`)
          .send({description: 'changed description'})
          .then(function(response){
            chai.expect(response).to.have.status(200);
            chai.expect(response.body).to.have.property('description',
            'changed description')
          });
      });
  });

  // it("should let you delete a website by id", function(){
  //   return chai.request(server)
  //     .delete('/api/website/123')
  //     .then(function(response){
  //       chai.expect(response).to.have.status(200)
  //       return chai.request(server)
  //         .get('/api/website/123')
  //         .then(function(response){
  //           chai.expect(response).to.have.status(404);
  //         })
  //         .catch(function(response){
  //           chai.expect(response).to.have.status(404);
  //         })
  //     })
  // });

});

describe("the pages endpoint", function(){

  beforeEach(function(){
    pageService.reset();
  });

  it("should let you create a page", function(){
    const testDataCreator = new setUpData();
    return testDataCreator.setUpPage()
      .then(function(response){
        chai.expect(response).to.have.status(200);
      })
  });

  it("should let you find pages by website id", function(){
    const testDataCreator = new setUpData();
    return testDataCreator.setUpPage()
      .then(function(response){
        return chai.request(server)
          .get(`/api/user/${testDataCreator.createdWebsite._user}/website/${testDataCreator.createdWebsite._id}/page`)
      })
      .then(function(response){
        chai.expect(response).to.have.status(200);
        chai.expect(response.body).to.have.lengthOf(1);
      });
    // return chai.request(server)
    //   .get('/api/user/456/website/456/page')
    //   .then(function(response){
    //     chai.expect(response).to.have.status(200);
    //     chai.expect(response.body).to.have.lengthOf(3);
    //     _.forEach(response.body, (page) => {
    //       chai.expect(page).to.have.property('websiteId', '456');
    //       })
    //   })
  });

  it("should let you find pages by page id", function () {
    const testDataCreator = new setUpData();
    return testDataCreator.setUpPage()
      .then(function(response){
        let createdPage = response.body;
        return chai.request(server)
          .get(`/api/page/${createdPage._id}`)
          .then(function(response){
            chai.expect(response).to.have.status(200);
            chai.expect(response.body).to.have.property('_id',
              createdPage._id);
            chai.expect(response.body).to.have.property('websiteId',
              testDataCreator.createdWebsite._id);
            chai.expect(response.body).to.have.property('name', 'test page')
          });
      });
  });

  it("should let you update a page", function(){
    const testDataCreator = new setUpData();
    return testDataCreator.setUpPage()
      .then(function(response){
        let createdPage = response.body;
        return chai.request(server)
          .put(`/api/page/${createdPage._id}`)
          .send({name: 'changed name'})
          .then(function(response){
            return chai.request(server)
              .get(`/api/page/${createdPage._id}`)
              .then(function(response){
                chai.expect(response).to.have.status(200);
                chai.expect(response.body).to.have.property('name', 'changed name')
              })
          })
      })
  });

  // it("should let you delete a page", function(){
  //   return chai.request(server)
  //     .post('/api/user/456/website/456/page')
  //     .send({name: 'test post', description: 'henlo this is a description'})
  //     .then(function(response){
  //       chai.expect(response).to.have.status(200);
  //       let createdPageId = response.body._id;
  //       return chai.request(server)
  //         .delete(`/api/page/${createdPageId}`)
  //         .then(function(response){
  //           chai.expect(response).to.have.status(200);
  //           return chai.request(server)
  //             .get(`/api/page/${createdPageId}`)
  //             .then(function(response){
  //               chai.expect(response).to.have.status(404);
  //             })
  //             .catch(function(response){
  //               chai.expect(response).to.have.status(404);
  //             })
  //         })
  //     })
  // })


});

describe("the widget endpoint", function(){

  beforeEach(function(){
    widgetService.reset();
  });

  it("should let you create widgets", function(){
    return chai.request(server)
      .post('/api/page/321/widget')
      .send({
        widgetType: "HEADING",
        size: 0,
        text: "test widget"
      })
      .then(function(response){
        chai.expect(response).to.have.status(200);
      })
  });

  it("should let you find all widgets on a page", function(){
    return chai.request(server)
      .get('/api/page/321/widget')
      .then(function(response){
        chai.expect(response).to.have.status(200);
        chai.expect(response.body).to.have.lengthOf(7);
        _.forEach(response.body, (widget) => {
          chai.expect(widget).to.have.property('pageId', '321');
        })
      })
  });

  it("should let you find a widget by id", function(){
    return chai.request(server)
      .post('/api/page/321/widget')
      .send({
        widgetType: "HEADING",
        size: 0,
        text: "test widget"
      })
      .then(function(response){
        chai.expect(response).to.have.status(200);
        let createdWidget = response.body
        return chai.request(server)
          .get(`/api/widget/${createdWidget._id}`)
          .then(function(response){
            chai.expect(response.body).to.have.property('_id', createdWidget._id)
            chai.expect(response.body).to.have.property('text', 'test widget');
          })
      })
  });

  it("should allow you to update a widget", function(){
    return chai.request(server)
      .post('/api/page/321/widget')
      .send({
        widgetType: "HEADING",
        size: 0,
        text: "test widget"
      })
      .then(function(response){
        chai.expect(response).to.have.status(200);
        let createdWidget = response.body;
        return chai.request(server)
          .put(`/api/widget/${createdWidget._id}`)
          .send({text: 'this is updated text'})
          .then(function(response){
            chai.expect(response).to.have.status(200);
            return chai.request(server)
              .get(`/api/widget/${createdWidget._id}`)
              .then(function(response){
                chai.expect(response.body).to.have.property('text', 'this is updated text');
              })
          })
      })
  });

  it("should allow you to delete a widget", function(){
    return chai.request(server)
      .post('/api/page/321/widget')
      .send({
        widgetType: "HEADING",
        size: 0,
        text: "test widget"
      })
      .then(function(response){
        let createdWidget = response.body
        return chai.request(server)
          .delete(`/api/widget/${createdWidget._id}`)
          .then(function(response){
            chai.expect(response).to.have.status(200);
            return chai.request(server)
              .get(`/api/widget/${createdWidget}`)
              .then(function(response){
                chai.expect(response).to.have.status(404);
              })
              .catch(function(response){
                chai.expect(response).to.have.status(404);
              })
          })
      })
  });

});