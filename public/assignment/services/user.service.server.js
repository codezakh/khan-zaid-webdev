/**
 * Created by zaidkhan on 7/29/17.
 */

var _ = require('lodash');


let users = [
  {
    _id: "123",
    username: "alice",
    password: "alice",
    firstName: "Alice",
    lastName: "Wonder"
  },
  {
    _id: "234",
    username: "bob",
    password: "bob",
    firstName: "Bob",
    lastName: "Marley"
  },
  {
    _id: "345",
    username: "charly",
    password: "charly",
    firstName: "Charly",
    lastName: "Garcia"
  },
  {
    _id: "456",
    username: "jannunzi",
    password: "jannunzi",
    firstName: "Jose",
    lastName: "Annunzi"
  }
];

const createUser = function(user) {
  user._id = _.last(users)._id + 1;
  users.push(user);
  console.log(user);
  return user
};

module.exports.api = function(app) {
  app.post('/api/user', (req, response) => {
    response.send(createUser(req.body));
  });

  app.get('/api/user/:userId', (req, response) => {

  });
};

module.exports.resetUsers = function() {
  // just for testing purposes
  users = [
    {
      _id: "123",
      username: "alice",
      password: "alice",
      firstName: "Alice",
      lastName: "Wonder"
    },
    {
      _id: "234",
      username: "bob",
      password: "bob",
      firstName: "Bob",
      lastName: "Marley"
    },
    {
      _id: "345",
      username: "charly",
      password: "charly",
      firstName: "Charly",
      lastName: "Garcia"
    },
    {
      _id: "456",
      username: "jannunzi",
      password: "jannunzi",
      firstName: "Jose",
      lastName: "Annunzi"
    }
  ];
};
