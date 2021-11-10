const { BAD_REQUEST, CONFLICT } = require('../constants/statusCodes');
const { MISSING_PROPERTIES, NO_TEAM_FOUND } = require('../constants/responseMessages');

// Services
const teamService = require('../services/teamService');
const teamChallengeService = require('../services/teamChallengeService');

// Utils
const CustomError = require('../utils/CustomError');
const handleResponseError = require('../utils/handleResponseError');
const handleResponseSuccess = require('../utils/handleResponseSuccess');
const participantService = require('../services/participantService');

function teamController() {
  async function getTeamById({ params: { teamId } }, res) {
    try {
      if (!teamId) {
        throw new CustomError(BAD_REQUEST, MISSING_PROPERTIES('teamId'));
      }

      const foundTeam = await teamService.findTeam({ _id: teamId });

      return handleResponseSuccess(res, foundTeam);
    } catch (getTeamByIdError) {
      return handleResponseError(res, getTeamByIdError);
    }
  }

  async function updateTeam({ params, body }, res) {
    const { teamId } = params;

    try {
      if (!teamId || !Object.keys(body).length) {
        throw new CustomError(BAD_REQUEST, MISSING_PROPERTIES('teamId or update query'));
      }
      const updatedTeam = await teamService.updateTeam(teamId, body);

      return handleResponseSuccess(res, updatedTeam);
    } catch (updateTeamError) {
      return handleResponseError(res, updateTeamError);
    }
  }

  async function deleteTeam({ params: { teamId } }, res) {
    try {
      if (!teamId) {
        throw new CustomError(BAD_REQUEST, MISSING_PROPERTIES('teamId'));
      }

      const deletedTeam = await teamService.deleteTeam(teamId);
      if (!deletedTeam) {
        throw new CustomError(CONFLICT, NO_TEAM_FOUND(teamId));
      }

      await participantService.deleteManyParticipants(deletedTeam.participants);
      await teamChallengeService.deleteManyTeamChallenges(deletedTeam.teamChallenges);

      return handleResponseSuccess(res, true);
    } catch (updateTeamError) {
      return handleResponseError(res, updateTeamError);
    }
  }

  return { getTeamById, updateTeam, deleteTeam };
}

module.exports = teamController();
