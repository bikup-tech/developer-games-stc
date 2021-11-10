const tournamentChallengeModel = require('../models/tournamentChallengeModel');

// Constants
const { BAD_REQUEST } = require('../constants/statusCodes');
const { MISSING_PROPERTIES } = require('../constants/responseMessages');

// Utils
const CustomError = require('../utils/CustomError');

function tournamentChallengeService() {
  function findTournamentChallengeById(tournamentChallengeId) {
    if (!tournamentChallengeId) {
      throw new CustomError(BAD_REQUEST, MISSING_PROPERTIES('tournamentChallengeId'));
    }

    const findQuery = { _id: tournamentChallengeId };
    return tournamentChallengeModel.findOne(findQuery);
  }

  function findTournamentChallengesByTournamentId(tournamentId) {
    if (!tournamentId) {
      throw new CustomError(BAD_REQUEST, MISSING_PROPERTIES('tournamentId'));
    }

    const findQuery = { tournamentId };
    return tournamentChallengeModel.find(findQuery);
  }

  async function createTournamentChallenge(challenge) {
    if (!challenge || !Object.keys(challenge).length) {
      throw new CustomError(BAD_REQUEST, MISSING_PROPERTIES('challenge'));
    }

    return tournamentChallengeModel.create(challenge);
  }

  return {
    findTournamentChallengeById, findTournamentChallengesByTournamentId, createTournamentChallenge,
  };
}

module.exports = tournamentChallengeService();
