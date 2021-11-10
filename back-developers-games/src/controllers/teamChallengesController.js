const { BAD_REQUEST } = require('../constants/statusCodes');
const { MISSING_QUERY_PROPERTIES, MISSING_PROPERTIES } = require('../constants/responseMessages');

const teamChallengeService = require('../services/teamChallengeService');

// Utils
const CustomError = require('../utils/CustomError');
const handleResponseError = require('../utils/handleResponseError');
const handleResponseSuccess = require('../utils/handleResponseSuccess');

function teamChallengesController() {
  async function getTeamChallenges({ query: { teamId } }, res) {
    try {
      if (!teamId || teamId === 'undefined') {
        throw new CustomError(BAD_REQUEST, MISSING_QUERY_PROPERTIES('teamId'));
      }

      const foundTeamChallenges = await teamChallengeService.findTeamChallenges(teamId);

      return handleResponseSuccess(res, foundTeamChallenges);
    } catch (getTeamChallengesError) {
      return handleResponseError(res, getTeamChallengesError);
    }
  }

  async function getAdminTemplateChallenges({ params: { tournamentId } }, res) {
    try {
      if (!tournamentId) {
        throw new CustomError(BAD_REQUEST, MISSING_PROPERTIES('tournamentId'));
      }

      const foundTeamChallenges = await teamChallengeService
        .findAdminTemplateChallengesByTournamentId(tournamentId);

      return handleResponseSuccess(res, foundTeamChallenges);
    } catch (getTeamChallengesError) {
      return handleResponseError(res, getTeamChallengesError);
    }
  }

  async function getCompletedChallengesByChallengeId(
    { params: { tournamentChallengeId } }, res,
  ) {
    try {
      if (!tournamentChallengeId) {
        throw new CustomError(BAD_REQUEST, MISSING_PROPERTIES('tournamentChallengeId'));
      }

      const completedChallenges = await teamChallengeService
        .findCompletedTeamChallengesByChallengeId(tournamentChallengeId);

      return handleResponseSuccess(res, completedChallenges);
    } catch (error) {
      return handleResponseError(res, error);
    }
  }
  return { getTeamChallenges, getCompletedChallengesByChallengeId, getAdminTemplateChallenges };
}

module.exports = teamChallengesController();
