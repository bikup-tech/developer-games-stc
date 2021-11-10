const { Router } = require('express');
const teamsController = require('../controllers/teamsController');
const teamController = require('../controllers/teamController');

const router = Router();

router.route('/')
  .get(teamsController.getTournamentTeams)
  .post(teamsController.createTeam);

router.route('/:teamId')
  .get(teamController.getTeamById)
  .patch(teamController.updateTeam)
  .delete(teamController.deleteTeam);

module.exports = router;
