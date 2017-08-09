var assert = require('assert');

const _ = require('lodash');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');

let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);


