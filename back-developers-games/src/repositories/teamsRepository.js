const teamModel = require('../models/teamModel');

function teamsRepository() {
  async function getTeamById(teamId) {
    return teamModel.find({ teamId });
  }

  return { getTeamById };
}

module.exports = teamsRepository();
