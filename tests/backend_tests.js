var assert = require('assert');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


describe('Array', function(){
  describe('indexOf', function(){
    it('should rub the lotion on its skin', function(){
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});


chai.use(chaiHttp);

describe('just kill me', () => {
  it("please fam", (done) => {
    chai.request(server)
      .get('/book')
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(200);
        done();
      });
  });
});