const { Router } = require('express');

const profileController = require('../controllers/profileController');

const router = Router();

router.route('/team')
  .patch(profileController.modifyTeamProfile);

router.route('/admin')
  .patch(profileController.modifyAdminProfile);

router.route('/:participantId')
  .get(profileController.getParticipantById);

module.exports = router;
