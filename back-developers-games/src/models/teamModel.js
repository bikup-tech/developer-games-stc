const { Schema, model } = require('mongoose');

const teamModel = new Schema({
  name: { type: String },
  captainId: { type: String, ref: 'Participants' },
  solvedChallenges: { type: Number, default: 0 },
  participants: [{ type: Schema.Types.ObjectId, ref: 'Participants' }],
  teamChallenges: [{ type: Schema.Types.ObjectId, ref: 'Team_challenges' }],
  tournamentId: { type: String },
});

module.exports = model('Teams', teamModel);
