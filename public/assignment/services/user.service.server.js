const _ = require('lodash');
const express = require('express');

let router = express.Router({mergeParams: true});
let websiteRouter = require('./website.service.server').router
const userModel = require('../model/user/user.model.server');

router.use('/:userId/website', websiteRouter);

router.post('/', function(request, response){
  userModel.createUser(request.body)
    .then((createdUser) => {
      response.send(createdUser);
    })
    .catch((error) => {
      response.send({});
    })
});

router.get('/', function(request, response){
  if (!request.params.password) {
    return userModel.findUserByUsername(request.query.username)
      .then((foundUser) => {
        response.send(foundUser);
      });
  }
    userModel.findUserByCredentials(request.query.username,
      request.query.password)
      .then((foundUser) => response.send(foundUser))
      .catch((error) => response.status(404).send('not found'));
});

router.get('/:userId', function(request, response){
  userModel.findUserById(request.params.userId)
    .then((foundUser) => {
      response.send(foundUser);
    })
    .catch((error) => {
      let e = error;
      response.status(404).send(error);
    })
});

router.delete('/:userId', function(request, response){
  userModel.deleteUser(request.params.userId)
    .then((userDeleted) => {
      response.send('user deleted')
    })
    .catch((error) => {
      response.status(500).send('could not delete')
    });
});

router.put('/:userId', function(request, response){
  userModel.updateUser(request.params.userId, request.body)
    .then((updatedUser) => {
      response.send(updatedUser)
    })
    .catch((error) => {
      response.status(500).send('couldnt update')
    })
})

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

function updateUser(userId, user){
  let userToUpdate = findUserById(userId);
  _.assign(userToUpdate, user)
  return userToUpdate;
};

