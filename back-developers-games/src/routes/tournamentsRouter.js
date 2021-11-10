const { Router } = require('express');
const tournamentController = require('../controllers/tournamentController');

const router = Router();

router.route('/:tournamentName')
  .get(tournamentController.getTournamentByName)
  .patch(tournamentController.updateTournament);

router.route('/:tournamentName/activate')
  .patch(tournamentController.activateTournament);

module.exports = router;
