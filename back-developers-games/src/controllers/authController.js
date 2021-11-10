const generator = require('generate-password');

const participantsModel = require('../models/participantModel');

// Constants
const { BAD_REQUEST, CONFLICT, NOT_FOUND } = require('../constants/statusCodes');
const {
  MISSING_PROPERTIES, NO_USER_FOUND, NOT_AN_EMAIL, NO_USER_EMAIL_FOUND,
} = require('../constants/responseMessages');

// Services
const { findParticipantByEmail, updateParticipant } = require('../services/participantService');
const { sendResetPassword } = require('../services/mailService');

// Utils
const CustomError = require('../utils/CustomError');
const handleResponseError = require('../utils/handleResponseError');
const handleResponseSuccess = require('../utils/handleResponseSuccess');
const { comparePasswords, encryptPassword } = require('../utils/bcryptUtils');
const isValidEmail = require('../utils/isValidEmail');

function authController() {
  async function login(req, res) {
    const { email, password: userPassword } = req.body;

    try {
      if (!email || !userPassword) {
        throw new CustomError(BAD_REQUEST, MISSING_PROPERTIES('Email or Pasword'));
      }

      const findQuery = {
        email,
      };

      const foundParticipant = await participantsModel.findOne(findQuery);
      const isPasswordCorrect = await comparePasswords(userPassword, foundParticipant.password);
      if (!foundParticipant || !isPasswordCorrect) {
        throw new CustomError(CONFLICT, NO_USER_FOUND);
      }

      // Create the participant object without the password property
      const { password, ...participant } = foundParticipant._doc;

      return handleResponseSuccess(res, participant);
    } catch (error) {
      return handleResponseError(res, error);
    }
  }

  async function checkCorrectPassword({ body: { userId, password } }, res) {
    try {
      if (!userId || !password) {
        throw new CustomError(BAD_REQUEST, MISSING_PROPERTIES('userId or Pasword'));
      }

      const findQuery = {
        _id: userId,
        password,
      };

      const foundUser = await participantsModel.findOne(findQuery);

      if (!foundUser) {
        return handleResponseSuccess(res, false);
      }

      return handleResponseSuccess(res, true);
    } catch (error) {
      return handleResponseError(res, error);
    }
  }

  async function resetPassword({ params: { participantEmail } }, res) {
    try {
      if (!participantEmail) {
        throw new CustomError(BAD_REQUEST, MISSING_PROPERTIES('participantEmail'));
      }
      if (!isValidEmail(participantEmail)) {
        throw new CustomError(BAD_REQUEST, NOT_AN_EMAIL);
      }

      const foundParticipant = await findParticipantByEmail(participantEmail);
      if (!foundParticipant) {
        throw new CustomError(NOT_FOUND, NO_USER_EMAIL_FOUND(participantEmail));
      }

      const generatedPassword = generator.generate({
        numbers: true,
      });

      const encryptedPassword = await encryptPassword(generatedPassword);

      const updateQuery = {
        password: encryptedPassword,
      };

      await updateParticipant(foundParticipant._id, updateQuery);

      await sendResetPassword(participantEmail, generatedPassword);

      return handleResponseSuccess(res, true);
    } catch (error) {
      return handleResponseError(res, error);
    }
  }

  return { login, checkCorrectPassword, resetPassword };
}

module.exports = authController();
