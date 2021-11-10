// Constants
const {
  BAD_REQUEST, CONFLICT,
} = require('../constants/statusCodes');
const { MISSING_QUERY_PROPERTIES, NO_TOURNAMENT_CHALLENGES_FOUND } = require('../constants/responseMessages');

// Services
const tournamentChallengeService = require('../services/tournamentChallengeService');

// Utils
const CustomError = require('../utils/CustomError');
const handleResponseError = require('../utils/handleResponseError');
const handleResponseSuccess = require('../utils/handleResponseSuccess');

function challengesController() {
  async function getAllTournamentChallenges(req, res) {
    const { tournamentId } = req.query;
    try {
      if (!tournamentId) {
        throw new CustomError(BAD_REQUEST, MISSING_QUERY_PROPERTIES('tournamentId'));
      }

      let tournamentChallenges = await tournamentChallengeService
        .findTournamentChallengesByTournamentId(tournamentId);

      if (!tournamentChallenges || !tournamentChallenges.length) {
        throw new CustomError(CONFLICT, NO_TOURNAMENT_CHALLENGES_FOUND(tournamentId));
      }

      tournamentChallenges = tournamentChallenges.sort((a, b) => a.number - b.number);

      return handleResponseSuccess(res, tournamentChallenges);
    } catch (getChallengesError) {
      return handleResponseError(res, getChallengesError);
    }
  }

  // TODO: This is a method to insert to DB, not public.
  async function createTournamentChallenge(req, res) {
    const challengeMock = {
      number: 9,
      name: 'Create a Quarkus Library microservice',
      title: 'Crea una librería',
      subtitle: 'con microservicios de Quarkus',
      mentor: 'Auri Muñoz',
      description: 'Build an application with Quarkus providing several REST endpoints that allow CRUD operations on books stored in a Postgres database. Moreover, deploy the application on',
      bonus: 'Add a simple User Interface to interact with the API.',
      duration: [{
        level: 'Beginner',
        duration: 4,
      }, {
        level: 'Intermediate',
        duration: 2,
      }],
      technologies: ['Red Hat OpenShift', 'Java / Quarkus'],
      deliverable: '',
      hints: 'the extensions to use, even you can do it using Spring Data JPA if you are more comfortable with it.',
      notes: 'RestEasy JAXRS, RestEasy Json, Hibernate ORM Panache, BDD PostgreSQL, SmallRye OpenAPI are the extensions to use.',
      video: 'https://youtu.be/2vrFl5qrRBE',
      tournamentId: '60a909ec62f534c96ab339d7',
    };
    const created = await tournamentChallengeService.createTournamentChallenge(challengeMock);

    res.json(created);
  }

  return { getAllTournamentChallenges, createTournamentChallenge };
}

module.exports = challengesController();
