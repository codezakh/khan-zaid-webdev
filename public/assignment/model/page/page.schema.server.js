const mongoose = require('mongoose');

const pageSchema = mongoose.Schema({
  _website: mongoose.Schema.Types.ObjectId,
  websiteId: mongoose.Schema.Types.ObjectId,
  name: String,
  title: String,
  description: String,
  widgets: [mongoose.Schema.Types.ObjectId],
  dateCreated: {type: Date, default: Date.now}
}, {collection: 'page'});

module.exports = pageSchema;