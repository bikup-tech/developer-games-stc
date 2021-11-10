// Constants
const { BAD_REQUEST, CONFLICT } = require('../constants/statusCodes');
const { MISSING_PROPERTIES, NO_CHALLENGE_FOUND } = require('../constants/responseMessages');

// Services
const teamChallengeService = require('../services/teamChallengeService');

// Utils
const CustomError = require('../utils/CustomError');
const handleResponseError = require('../utils/handleResponseError');
const handleResponseSuccess = require('../utils/handleResponseSuccess');

function teamChallengeController() {
  async function getTeamChallengeById({ params: { teamChallengeId } }, res) {
    try {
      if (!teamChallengeId) {
        throw new CustomError(BAD_REQUEST, MISSING_PROPERTIES('teamChallengeId'));
      }

      const foundTeamChallenge = await teamChallengeService.findTeamChallengeById(teamChallengeId);

      if (!foundTeamChallenge) {
        throw new CustomError(CONFLICT, NO_CHALLENGE_FOUND(teamChallengeId));
      }

      return handleResponseSuccess(res, foundTeamChallenge);
    } catch (getChallengeError) {
      return handleResponseError(res, getChallengeError);
    }
  }

  async function updateTeamChallenge({ body, params }, res) {
    const { teamChallengeId } = params;

    try {
      if (!teamChallengeId || !Object.keys(body).length) {
        throw new CustomError(BAD_REQUEST, MISSING_PROPERTIES('teamChallengeId or updateQuery'));
      }

      const updateQuery = {
        $set: body,
      };
      const updatedChallenge = await teamChallengeService
        .updateTeamChallenge(teamChallengeId, updateQuery);

      return handleResponseSuccess(res, updatedChallenge);
    } catch (updateChallengeError) {
      return handleResponseError(res, updateChallengeError);
    }
  }

  return { getTeamChallengeById, updateTeamChallenge };
}

module.exports = teamChallengeController();
