const { Schema, model } = require('mongoose');

const logsModel = new Schema({
  type: { type: String },
  data: { type: Object },
  date: { type: String },
  status: { type: String },
});

module.exports = model('Log', logsModel);
