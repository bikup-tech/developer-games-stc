const { Router } = require('express');

const rawUploadFilesController = require('../controllers/uploadFilesController');

function uploadFilesRouter(gcBucket) {
  const router = Router();
  const uploadFilesController = rawUploadFilesController(gcBucket);

  router.route('/avatar/:participantId')
    .patch(uploadFilesController.uploadAvatar);

  router.route('/deliverable/:teamChallengeId')
    .patch(uploadFilesController.uploadDeliverable);

  return router;
}

module.exports = uploadFilesRouter;
