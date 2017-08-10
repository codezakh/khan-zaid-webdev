const mongoose = require('mongoose');

const widgetSchema = mongoose.Schema({
  _page: mongoose.Schema.Types.ObjectId,
  type: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
  name: String,
  text: String,
  placeholder: String,
  description: String,
  url: String,
  width: String,
  height: String,
  rows: Number,
  size: Number,
  className: String,
  icon: String,
  deletable: Boolean,
  formatted: Boolean,
  dateCreated: {type: Date, default: Date.new},
}, {collection: 'widget'});

module.exports = widgetSchema;