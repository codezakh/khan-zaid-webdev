var assert = require('assert');

let chai = require('chai');
let chaiHttp = require('chai-http');
let chaiAsPromised = require('chai-as-promised');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
chai.use(chaiAsPromised);


describe('the /users endpoint', () => {
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

  it("should allow you to find users by id", () => {
    return chai.request(server)
      .post('/api/user', {
        username: 'testusername',
        password: 'testpassword',
        firstName: 'goolius',
        lastName: 'boozler'
      })
      .then((response) => {
        chai.expect(response).to.have.status(300);
      })
  });
});