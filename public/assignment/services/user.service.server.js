const _ = require('lodash');
const express = require('express');

let router = express.Router();

router.post('/', function(request, response){
  response.send(createUser(request.body));
});

router.get('/', function(request, response){
  if (_.has(request.query, 'username')) {
    return response.send(findUserByUsername(request.query.username));
  } else if (_.has(request.query, ['username', 'password'])) {
    return response.send(
      findUserByCredentials(request.query.username, request.query.password)
    );
  }
});

router.get('/:userId', function(request, response){
  // response.setHeader('Content-Type', 'application/json');
  // response.send(JSON.stringify(findUserById(request.params.userId)));
  let user = findUserById(request.params.userId);

  if (_.isUndefined(user)) {
    response.status(404).send('Not found');
  }

  response.send(user);
});

router.delete('/:userId', function(request, response){
  response.send(deleteUser(request.params.userId));
});

module.exports.router = router;
module.exports.reset = resetData;

var users = [
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

let _userResetCopy = _.cloneDeep(users);

function resetData(){
  users = _.cloneDeep(_userResetCopy);
}

function createUser(user){
  user._id = String(Number(_.last(users)._id) + 1);
  users.push(user);
  return user;
}

function findUserById(userId) {
  return _.find(users, ['_id', userId]);
};

function findUserByUsername(username) {
  return _.find(users, ['username', username]);
};

function findUserByCredentials(username, password) {
  return _.find(users, {username: username, password: password});
}

function deleteUser(userId) {
  return _.remove(users, (user) => _.isEqual(user._id, userId));
}

// const createUser = function(user) {
//   user._id = _.last(users)._id + 1;
//   users.push(user);
//   console.log(user);
//   return user
// };
//
// module.exports.api = function(app) {
//   app.post('/api/user', (req, response) => {
//     response.send(createUser(req.body));
//   });
//
//   app.get('/api/user/:userId', (req, response) => {
//
//   });
// };
//
// module.exports.resetUsers = function() {
//   // just for testing purposes
//   users = [
//     {
//       _id: "123",
//       username: "alice",
//       password: "alice",
//       firstName: "Alice",
//       lastName: "Wonder"
//     },
//     {
//       _id: "234",
//       username: "bob",
//       password: "bob",
//       firstName: "Bob",
//       lastName: "Marley"
//     },
//     {
//       _id: "345",
//       username: "charly",
//       password: "charly",
//       firstName: "Charly",
//       lastName: "Garcia"
//     },
//     {
//       _id: "456",
//       username: "jannunzi",
//       password: "jannunzi",
//       firstName: "Jose",
//       lastName: "Annunzi"
//     }
//   ];
// };
