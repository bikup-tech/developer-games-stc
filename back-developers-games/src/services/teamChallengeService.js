const teamChallengeModel = require('../models/teamChallengeModel');

// Constants
const { BAD_REQUEST } = require('../constants/statusCodes');
const { MISSING_PROPERTIES } = require('../constants/responseMessages');

// Utils
const CustomError = require('../utils/CustomError');

function teamChallengeService() {
  function findTeamChallengeById(teamChallengeId) {
    if (!teamChallengeId) {
      throw new CustomError(BAD_REQUEST, MISSING_PROPERTIES('teamChallengeId'));
    }

    const filter = { _id: teamChallengeId };
    return teamChallengeModel.findOne(filter).populate('tournamentChallenge');
  }

  function createTeamChallenge(tournamentChallenge, challengeName, challengeNumber) {
    if (!tournamentChallenge) {
      throw new CustomError(BAD_REQUEST, MISSING_PROPERTIES('tournamentChallengeId'));
    }

    return teamChallengeModel.create({ tournamentChallenge, challengeName, challengeNumber });
  }

  function updateTeamChallenge(teamChallengeId, updateQuery) {
    if (!teamChallengeId || !updateQuery || !Object.keys(updateQuery).length) {
      throw new CustomError(BAD_REQUEST, MISSING_PROPERTIES('teamChallengeId or updateQuery'));
    }

    const filter = { _id: teamChallengeId };
    const updateOptions = {
      new: true, useFindAndModify: false,
    };

    return teamChallengeModel.findOneAndUpdate(filter, updateQuery, updateOptions);
  }

  function findTeamChallenges(teamId) {
    if (!teamId) {
      throw new CustomError(BAD_REQUEST, MISSING_PROPERTIES('teamId'));
    }

    return teamChallengeModel.find({ teamId }).populate('tournamentChallenge');
  }

  function updateManyTeamChallenges(teamChallengeIds, updateQuery) {
    if (!teamChallengeIds || !teamChallengeIds.length) {
      throw new CustomError(BAD_REQUEST, MISSING_PROPERTIES('teamChallengeIds'));
    }

    const filter = { _id: { $in: teamChallengeIds } };
    const options = { new: true };

    return teamChallengeModel.updateMany(filter, updateQuery, options);
  }

  function deleteManyTeamChallenges(teamChallenges) {
    return teamChallengeModel.deleteMany({ _id: { $in: teamChallenges } });
  }

  function findAndUpdateTeamChallenge(teamChallengeId, updateQuery) {
    const filter = { _id: teamChallengeId };
    const updateOptions = { useFindAndModify: false };

    return teamChallengeModel.findOneAndUpdate(filter, updateQuery, updateOptions);
  }

  function findCompletedTeamChallengesByChallengeId(tournamentChallengeId) {
    const query = {
      tournamentChallenge: tournamentChallengeId,
      isCompleted: true,
    };
    return teamChallengeModel.find(query).populate('teamId');
  }

  function findAdminTemplateChallengesByTournamentId(tournamentId) {
    const query = {
      tournamentId,
      isAdminTemplate: true,
    };

    return teamChallengeModel.find(query).populate('tournamentChallenge');
  }

  return {
    findTeamChallengeById,
    createTeamChallenge,
    updateTeamChallenge,
    findTeamChallenges,
    updateManyTeamChallenges,
    deleteManyTeamChallenges,
    findAndUpdateTeamChallenge,
    findCompletedTeamChallengesByChallengeId,
    findAdminTemplateChallengesByTournamentId,
  };
}

module.exports = teamChallengeService();
