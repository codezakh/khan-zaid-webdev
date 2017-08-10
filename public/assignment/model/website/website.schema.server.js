const mongoose = require('mongoose');

const websiteSchema = mongoose.Schema({
  _user: mongoose.Schema.Types.ObjectId,
  developerId: mongoose.Schema.Types.ObjectId,
  name: String,
  description: String,
  pages: [mongoose.Schema.Types.ObjectId],
  dateCreated: {type: Date, default: Date.now}
}, {collection: 'website'});

module.exports = websiteSchema;