const mongoose = require('mongoose');

const db = require('../../../test/app').db

let userSchema = mongoose.Schema({
  username: String,
  password: String
}, {collection: 'user'});

let userModel = mongoose.model('userModel', userSchema);

userModel.create({username: 'alice'}, function(error, user){
  if(error) {
    console.log(error);
  } else {
    console.log(user);
  }
});