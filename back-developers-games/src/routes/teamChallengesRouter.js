const { Router } = require('express');
const teamChallengesController = require('../controllers/teamChallengesController')();
const teamChallengeController = require('../controllers/teamChallengeController');
const rawGCBucketTeamChallengesController = require('../controllers/teamChallengesController');

const router = Router();

function teamChallengesRouter(gcBucket) {
  const gcBucketTeamChallengesController = rawGCBucketTeamChallengesController(gcBucket);

  router.route('/')
    .get(teamChallengesController.getTeamChallenges);

  router.route('/adminTemplates/:tournamentId')
    .get(teamChallengesController.getAdminTemplateChallenges);

  router.route('/completed/:tournamentChallengeId')
    .get(teamChallengesController.getCompletedChallengesByChallengeId);

  router.route('/completed/zip/:tournamentChallengeId')
    .get(gcBucketTeamChallengesController.zipCompletedChallengesByTournamentChallengeId);

  router.route('/:teamChallengeId')
    .get(teamChallengeController.getTeamChallengeById)
    .patch(teamChallengeController.updateTeamChallenge);

  return router;
}

module.exports = teamChallengesRouter;
