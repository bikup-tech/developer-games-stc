const { BAD_REQUEST, CONFLICT } = require('../constants/statusCodes');
const {
  UPDATE_PROFILE_SUCCESS, EMPTY_BODY, NO_TEAM_FOUND, WRONG_PROPERTIES, NO_USER_ID_FOUND,
  MISSING_PROPERTIES,
} = require('../constants/responseMessages');

// Services
const teamService = require('../services/teamService');
const participantService = require('../services/participantService');

// Utils
const CustomError = require('../utils/CustomError');
const handleResponseError = require('../utils/handleResponseError');
const handleResponseSuccess = require('../utils/handleResponseSuccess');

const teamValidProps = {
  name: 'name',
  teamName: 'teamName',
  teamId: 'teamId',
  newPassword: 'newPassword',
  participantId: 'participantId',
  phone: 'phone',
};

const adminValidProps = {
  name: 'name',
  newPassword: 'newPassword',
  phone: 'phone',
  participantId: 'participantId',
  surname: 'surname',
};

function bodyHasWrongProps([...props], validProps) {
  let hasWrongProperties = false;

  props.forEach((prop) => {
    if (!validProps[prop]) {
      hasWrongProperties = true;
    }
  });

  return hasWrongProperties;
}

function profileController() {
  async function modifyTeamProfile({ body }, res) {
    try {
      if (!Object.keys(body).length) {
        throw new CustomError(BAD_REQUEST, EMPTY_BODY);
      }

      if (bodyHasWrongProps(Object.keys(body), teamValidProps)) {
        throw new CustomError(BAD_REQUEST, WRONG_PROPERTIES);
      }

      if (body.teamName) {
        const teamQuery = { name: body.teamName };
        const updatedTeam = await teamService.updateTeam(body.teamId, teamQuery);
        if (!updatedTeam) {
          throw new CustomError(CONFLICT, NO_TEAM_FOUND(body.teamId));
        }
      }

      if (body.newPassword) {
        const passwordQuery = { password: body.newPassword };
        const updatedParticipant = await participantService
          .updateParticipant(body.participantId, passwordQuery);

        if (!updatedParticipant.n) {
          throw new CustomError(CONFLICT, NO_USER_ID_FOUND(body.participantId));
        }
      }

      return handleResponseSuccess(res, UPDATE_PROFILE_SUCCESS);
    } catch (modifyTeamError) {
      return handleResponseError(res, modifyTeamError);
    }
  }

  async function modifyAdminProfile({ body }, res) {
    try {
      if (!Object.keys(body).length) {
        throw new CustomError(BAD_REQUEST, EMPTY_BODY);
      }

      if (bodyHasWrongProps(Object.keys(body), adminValidProps)) {
        throw new CustomError(BAD_REQUEST, WRONG_PROPERTIES);
      }

      const { newPassword, participantId, ...bodyProps } = body;

      if (newPassword) {
        bodyProps.password = newPassword;
      }
      const updatedAdmin = await participantService.updateParticipant(participantId, bodyProps);

      if (!updatedAdmin.n) {
        throw new CustomError(CONFLICT, NO_USER_ID_FOUND(body.participantId));
      }

      const data = await participantService.findParticipantById(body.participantId);
      const { password, ...foundAdmin } = data._doc;

      return handleResponseSuccess(res, foundAdmin);
    } catch (modifyAdminError) {
      return handleResponseError(res, modifyAdminError);
    }
  }

  async function getParticipantById({ params: { participantId } }, res) {
    try {
      if (!participantId) {
        throw new CustomError(BAD_REQUEST, MISSING_PROPERTIES('participantId'));
      }

      const data = await participantService.findParticipantById(participantId);

      const { password, ...foundParticipant } = data._doc;

      return handleResponseSuccess(res, foundParticipant);
    } catch (getParticipantError) {
      return handleResponseError(res, getParticipantError);
    }
  }

  return { modifyTeamProfile, modifyAdminProfile, getParticipantById };
}

module.exports = profileController();
