const { Router } = require('express');
const tournamentChallengesController = require('../controllers/tournamentChallengesController');

const router = Router();

router.route('/')
  .get(tournamentChallengesController.getAllTournamentChallenges)
  .post(tournamentChallengesController.createTournamentChallenge); // NOT PUBLIC

module.exports = router;
