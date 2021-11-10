// Constants
const { BAD_REQUEST } = require('../constants/statusCodes');
const { MISSING_AVATAR_FILE, MISSING_DELIVERABLE_FILE, MISSING_QUERY_PROPERTIES } = require('../constants/responseMessages');

// Services
const participantService = require('../services/participantService');
const teamChallengeService = require('../services/teamChallengeService');

// Utils
const CustomError = require('../utils/CustomError');
const handleResponseError = require('../utils/handleResponseError');
const handleResponseSuccess = require('../utils/handleResponseSuccess');

function uploadFilesController(gcBucket) {
  async function uploadAvatar({ files, params: { participantId } }, res) {
    try {
      if (!files || !files.avatar) {
        throw new CustomError(BAD_REQUEST, MISSING_AVATAR_FILE);
      }

      const file = files.avatar;
      const filePath = files.avatar.tempFilePath;
      let filename = filePath.split('/');
      filename = filename[filename.length - 1];

      await gcBucket.upload(filePath, {
        metadata: {
          contentType: file.mimetype,
        },
      });

      const updateQuery = { $set: { avatar: filename } };

      const updatedParticipant = await participantService
        .findAndUpdateParticipant(participantId, updateQuery);

      if (updatedParticipant.avatar !== 'avatar-icon.svg') {
        await gcBucket.file(updatedParticipant.avatar).delete();
      }

      return handleResponseSuccess(res, filename);
    } catch (uploadAvatarError) {
      return handleResponseError(res, uploadAvatarError);
    }
  }

  async function uploadDeliverable({
    files,
    params: { teamChallengeId },
    query: { teamName, challengeNumber },
  }, res) {
    try {
      if (!files || !files.deliverable) {
        throw new CustomError(BAD_REQUEST, MISSING_DELIVERABLE_FILE);
      }

      if (!teamName || !challengeNumber) {
        throw new CustomError(BAD_REQUEST, MISSING_QUERY_PROPERTIES('teamName, challengeNumber'));
      }

      const file = files.deliverable;
      const filePath = files.deliverable.tempFilePath;

      let uploadedFilename = filePath.split('/');
      uploadedFilename = uploadedFilename[uploadedFilename.length - 1];

      let fileExtension = file.name.split('.');
      fileExtension = fileExtension[fileExtension.length - 1];

      const downloadFileName = `${teamName}_challenge-${challengeNumber}.${fileExtension}`;

      await gcBucket.upload(filePath, {
        metadata: {
          contentType: file.mimetype,
          contentDisposition: `inline; filename="${downloadFileName}"`,
        },
      });

      const updateQuery = { $set: { filename: file.name, gcloudName: uploadedFilename } };
      const updatedTeamChallenge = await teamChallengeService
        .findAndUpdateTeamChallenge(teamChallengeId, updateQuery);

      if (updatedTeamChallenge.gcloudName) {
        await gcBucket.file(updatedTeamChallenge.gcloudName).delete();
      }

      const response = { filename: file.name, gcloudName: uploadedFilename };

      return handleResponseSuccess(res, response);
    } catch (uploadDeliverableError) {
      return handleResponseError(res, uploadDeliverableError);
    }
  }

  return { uploadAvatar, uploadDeliverable };
}

module.exports = uploadFilesController;
