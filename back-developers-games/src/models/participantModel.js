const { Schema, model } = require('mongoose');

const participantModel = new Schema({
  role: { type: Number, default: 0 },
  email: { type: String },
  password: { type: String },
  name: { type: String },
  surname: { type: String },
  phone: { type: String },
  teamNumber: { type: Number },
  teamId: { type: String },
  avatar: { type: String, default: 'avatar-icon.svg' },
  tournamentId: { type: String },
});

module.exports = model('Participants', participantModel);
