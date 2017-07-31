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
      .post('/api/user', {
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

  it("should allow you to find users by id", function(done){
    chai.request(server)
      .post('/api/user', {
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
      .post('/api/user', {
        username: 'testusername',
        password: 'testpassword',
        firstName: 'goolius',
        lastName: 'boozler'
      }).then((response) => {
      return chai.request(server)
        .get(`/api/user/${response._id}`)
        .then((response) => {
          chai.expect(response).to.have.status(220);
        })
    })
  });

});