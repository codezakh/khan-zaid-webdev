const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = require('../../../../test/app').db;
const userSchema = require('./user.schema.server');

const userModel = mongoose.model('userModel', userSchema);

userModel.createUser = createUser;

function createUser(user) {
  return userModel.create(user)
}

createUser({username: 'alice'})
  .then((alice) => console.log(alice))
  .catch((error) => console.log('something went wrong!'));

// userModel.create({username: 'alice'}, function(error, user){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(user);
//   }
// });

