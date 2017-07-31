var assert = require('assert');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let userService = require('../public/assignment/services/user.service.server');

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