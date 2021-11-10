const { Schema, model } = require('mongoose');

const teamChallengeModel = new Schema({
  tournamentChallenge: { type: String, ref: 'Tournament_challenges' },
  teamId: { type: String, ref: 'Teams' },
  isCompleted: { type: Boolean, default: false },
  filename: { type: String },
  gcloudName: { type: String },
  challengeName: { type: String },
  challengeNumber: { type: Number },
  isAdminTemplate: { type: Boolean },
  tournamentId: { type: String },
});

module.exports = model('Team_challenges', teamChallengeModel);
