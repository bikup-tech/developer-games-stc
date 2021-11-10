const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.route('/')
  .post(authController.login);

router.route('/check')
  .post(authController.checkCorrectPassword);

router.route('/resetPassword/:participantEmail')
  .post(authController.resetPassword);

module.exports = router;
