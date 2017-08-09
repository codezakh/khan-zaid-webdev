const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  websites: [mongoose.Schema.Types.ObjectId],
  dateCreated: {type: Date, default: Date.now},
}, {collection: 'user'});

module.exports = userSchema;
