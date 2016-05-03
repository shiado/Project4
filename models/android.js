'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const androidSchema = new Schema({
  country: String,
  content: Object,
  metadata: Object
});

module.exports = mongoose.model('Android', androidSchema);
