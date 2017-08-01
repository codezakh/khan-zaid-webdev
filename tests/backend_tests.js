var assert = require('assert');

const _ = require('lodash');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let userService = require('../public/assignment/services/user.service.server');
let websiteService = require('../public/assignment/services/website.service.server');
let pageService = require('../public/assignment/services/page.service.server');

let should = chai.should();

chai.use(chaiHttp);


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

  it("should allow you to delete users", function(){
    return chai.request(server)
      .delete('/api/user/456')
      .then((response) => {
      chai.expect(response).to.have.status(200);
      return chai.request(server)
        .get('/api/user/456')
        .query({username: response.body.username})
        .then((response) => {
          chai.expect(response).to.have.status(404);
        })
        .catch((error) => {
          chai.expect(error).to.have.status(404);
        })
    })
  });

});


describe('the websites endpoint', function(){

  beforeEach(function(){
    websiteService.reset();
  });

  it("should let you create a website", function(){
    return chai.request(server)
      .post('/api/user/456/website')
      .send({
        name: "Swagbook",
        description: "test website"
      })
      .then(function(response){
        chai.expect(response).to.have.status(200);
      })
  });

  it("should let you find all websites by a user", function(){
    return chai.request(server)
      .get('/api/user/456/website')
      .then(function(response){
        chai.expect(response).to.have.status(200);
        chai.expect(response.body).to.have.lengthOf(3);
        _.forEach(response.body, (website) => {
          chai.expect(website).to.have.property('developerId', "456");
        })
      })
  });

  it("should let you find a website by id", function(){
    return chai.request(server)
      .post('/api/user/456/website')
      .send({
        name: "Swagbook",
        description: "test website"
      })
      .then(function(response){
        return chai.request(server)
          .get(`/api/website/${response.body._id}`)
          .then(function(response){
            chai.expect(response).to.have.status(200);
            chai.expect(response.body).to.have.property('description', "test website");
            chai.expect(response.body).to.have.property('name', 'Swagbook');
          })
      })
  });

  it("should let you update a website by id", function(){
    return chai.request(server)
      .put('/api/website/123')
      .send({description: "description updated"})
      .then(function(response){
        chai.expect(response).to.have.status(200)
        return chai.request(server)
          .get('/api/website/123')
          .then(function(response){
            chai.expect(response.body).to.have.property('description', 'description updated')
          })
      })
  });

  it("should let you delete a website by id", function(){
    return chai.request(server)
      .delete('/api/website/123')
      .then(function(response){
        chai.expect(response).to.have.status(200)
        return chai.request(server)
          .get('/api/website/123')
          .then(function(response){
            chai.expect(response).to.have.status(404);
          })
          .catch(function(response){
            chai.expect(response).to.have.status(404);
          })
      })
  });

});

describe("the pages endpoint", function(){

  beforeEach(function(){
    pageService.reset();
  });

  it("should let you create a page", function(){
    return chai.request(server)
      .post('/api/user/456/website/123/page')
      .send({name: "test post", description: "henlo this is a description"})
      .then(function(response){
        chai.expect(response).to.have.status(200);
        chai.expect(response.body).to.have.property('name', 'test post');
      })
  });
});