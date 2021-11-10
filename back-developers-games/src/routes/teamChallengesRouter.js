const { Router } = require('express');
const teamChallengesController = require('../controllers/teamChallengesController');
const teamChallengeController = require('../controllers/teamChallengeController');

const router = Router();

router.route('/')
  .get(teamChallengesController.getTeamChallenges);

router.route('/adminTemplates/:tournamentId')
  .get(teamChallengesController.getAdminTemplateChallenges);

router.route('/completed/:tournamentChallengeId')
  .get(teamChallengesController.getCompletedChallengesByChallengeId);

router.route('/:teamChallengeId')
  .get(teamChallengeController.getTeamChallengeById)
  .patch(teamChallengeController.updateTeamChallenge);

module.exports = router;
