const { BAD_REQUEST, CONFLICT } = require('../constants/statusCodes');
const {
  MISSING_PROPERTIES,
  EMPTY_BODY,
  ALREADY_EXISTING_PARTICIPANT,
  MISSING_PARTICIPANT_PROPERTIES,
  NOT_AN_EMAIL,
} = require('../constants/responseMessages');
const userRoles = require('../constants/userRoles');

// Constants
const logTypes = require('../constants/logTypes');
const logStatus = require('../constants/logStatus');

// Services
const participantService = require('../services/participantService');
const teamService = require('../services/teamService');
const mailService = require('../services/mailService');
const logService = require('../services/logService');

// Utils
const CustomError = require('../utils/CustomError');
const handleResponseError = require('../utils/handleResponseError');
const handleResponseSuccess = require('../utils/handleResponseSuccess');

const logsModel = require('../models/logModel');

function bodyHasRequiredProps(body) {
  return body.email && body.name && body.surname && body.phone;
}

function participantController() {
  async function deleteParticipant({ params: { participantId } }, res) {
    try {
      if (!participantId) {
        throw new CustomError(BAD_REQUEST, MISSING_PROPERTIES('participantId'));
      }
      // Delete participant
      const deletedParticipant = await participantService.deleteParticipant(
        participantId,
      );

      // Remove it from the team participants array
      await teamService.removeParticipantFromTeam(
        deletedParticipant.teamId,
        participantId,
      );

      return handleResponseSuccess(res, true);
    } catch (deleteParticipantError) {
      return handleResponseError(res, deleteParticipantError);
    }
  }

  async function createParticipant({ body }, res) {
    try {
      if (!Object.keys(body)) {
        throw new CustomError(BAD_REQUEST, EMPTY_BODY);
      }

      if (!bodyHasRequiredProps(body)) {
        throw new CustomError(BAD_REQUEST, MISSING_PARTICIPANT_PROPERTIES);
      }

      const alreadyExists = await participantService.findParticipantByEmail(
        body.email,
      );
      if (alreadyExists) {
        throw new CustomError(CONFLICT, ALREADY_EXISTING_PARTICIPANT);
      }

      // Check requiered camps
      if (body.role === userRoles.PARTICIPANT && !body.teamId) {
        throw new CustomError(BAD_REQUEST, MISSING_PROPERTIES('teamId'));
      }

      if (!body.email.includes('@') || !body.email.includes('.')) {
        throw new CustomError(BAD_REQUEST, NOT_AN_EMAIL);
      }

      // Create participant
      const createdParticipant = await participantService.createParticipant(
        body,
      );

      // Update team participants array
      await teamService.addParticipantToTeam(
        body.teamId,
        createdParticipant._id,
      );

      // Send email
      if (body.role === userRoles.PARTICIPANT) {
        await mailService.sendRegisteredUser(
          createdParticipant.email,
          createdParticipant.tempPassword,
        );
      } else {
        await mailService.sendRegisteredMentor(
          createdParticipant.email,
          createdParticipant.tempPassword,
        );
      }

      const { password, ...restParticipant } = createdParticipant._doc;
      return handleResponseSuccess(res, restParticipant);
    } catch (createParticipantError) {
      logsModel.create({ data: createParticipantError, date: new Date() });
      await logService.createLog(
        logTypes.CREATE_PARTICIPANT,
        createParticipantError,
        logStatus.ERROR,
      );
      return handleResponseError(res, createParticipantError);
    }
  }

  async function getMentors(req, res) {
    try {
      const mentors = await participantService.findMentors();
      return handleResponseSuccess(res, mentors);
    } catch (error) {
      return handleResponseError(res, error);
    }
  }

  return { deleteParticipant, createParticipant, getMentors };
}

module.exports = participantController();
