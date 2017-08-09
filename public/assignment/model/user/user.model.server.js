const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = require('../../../../test/app').db;
const userSchema = require('./user.schema.server');

const userModel = mongoose.model('userModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addWebsiteToUser = addWebsiteToUser;

function createUser(user) {
  return userModel.create(user)
}

function findUserById(userId) {
  return userModel.findOne({_id: userId});
}

function findUserByUsername(username) {
  return userModel.findOne({username: username});
}

function findUserByCredentials(username, password){
  return userModel.findOne({username: username, password: password})
}

function updateUser(userId, user) {
  return userModel.update({_id: userId}, {$set: user, new: true})
    .then((unused) => {
      return userModel.findUserById(userId);
    })
}

function deleteUser(userId) {
  return userModel.findOneAndRemove({_id: userId});
}

function addWebsiteToUser(userId, website){
  return userModel.findOne({_id: userId})
    .then((foundUser) => {
      foundUser.websites.push(website._id)
      return foundUser.save()
    })
}

module.exports = userModel;

