const teamModel = require('../models/teamModel');

// Constants
const { BAD_REQUEST } = require('../constants/statusCodes');
const { MISSING_PROPERTIES, MISSING_QUERY } = require('../constants/responseMessages');

// Utils
const CustomError = require('../utils/CustomError');

function teamService() {
  async function findTeam(findQuery) {
    if (!findQuery || !Object.keys(findQuery).length) {
      throw new CustomError(BAD_REQUEST, MISSING_QUERY);
    }

    return teamModel.findOne(findQuery).populate('participants');
  }

  async function createTeam(name, participants, teamChallenges, captainId, tournamentId) {
    if (!name || !participants) {
      throw new CustomError(BAD_REQUEST, MISSING_PROPERTIES('participants or name'));
    }

    const createTeamQuery = {
      name, participants, teamChallenges, captainId, tournamentId,
    };

    return teamModel.create(createTeamQuery);
  }

  async function updateTeam(_id, updateQuery) {
    const updateOptions = {
      new: true, useFindAndModify: false,
    };

    return teamModel.findOneAndUpdate({ _id }, updateQuery, updateOptions).populate('participants');
  }

  async function findTournamentTeams(tournamentId) {
    return teamModel.find({ tournamentId }).populate('participants').populate('teamChallenges').populate('captainId');
  }

  async function deleteTeam(teamId) {
    // return teamModel.deleteOne({ _id: teamId });
    return teamModel.findOneAndDelete({ _id: teamId });
  }

  async function removeParticipantFromTeam(teamId, participantId) {
    const updateQuery = {
      $pull: { participants: participantId },
    };

    return teamModel.updateOne({ _id: teamId }, updateQuery);
  }

  async function addParticipantToTeam(teamId, participantId) {
    const updateQuery = {
      $push: { participants: participantId },
    };

    return teamModel.updateOne({ _id: teamId }, updateQuery);
  }

  return {
    findTeam,
    createTeam,
    updateTeam,
    findTournamentTeams,
    deleteTeam,
    removeParticipantFromTeam,
    addParticipantToTeam,
  };
}

module.exports = teamService();
