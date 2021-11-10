// Constants
const {
  BAD_REQUEST, CONFLICT, CREATED,
} = require('../constants/statusCodes');
const {
  MISSING_PROPERTIES, ALREADY_EXISTING_TEAM, REGISTER_TEAM_SUCCESS, NO_TOURNAMENT_FOUND,
  MISSING_QUERY_PROPERTIES,
  ALREADY_REGISTERED_EMAILS,
} = require('../constants/responseMessages');
const userRoles = require('../constants/userRoles');

// Services
const teamService = require('../services/teamService');
const participantService = require('../services/participantService');
const tournamentChallengeService = require('../services/tournamentChallengeService');
const teamChallengeService = require('../services/teamChallengeService');
const tournamentService = require('../services/tournamentService');
const mailService = require('../services/mailService');

// Utils
const CustomError = require('../utils/CustomError');
const handleResponseError = require('../utils/handleResponseError');
const handleResponseSuccess = require('../utils/handleResponseSuccess');

function teamsController() {
  async function createTeam({ body: { name, participants, tournamentId } }, res) {
    try {
      if (!participants || !name || !tournamentId) {
        throw new CustomError(BAD_REQUEST, MISSING_PROPERTIES('participants, name or tournamentId'));
      }

      // Check team name, team emails && existing tournament
      const foundTeam = await teamService.findTeam({ name });
      if (foundTeam) {
        throw new CustomError(CONFLICT, ALREADY_EXISTING_TEAM(name));
      }
      const participantEmails = participants.map((participant) => participant.email);
      const foundParticipants = await participantService.findParticipantEmails(participantEmails);
      if (foundParticipants) {
        throw new CustomError(CONFLICT, ALREADY_REGISTERED_EMAILS(foundParticipants));
      }

      const foundTournament = await tournamentService.findTournamentById(tournamentId);
      if (!foundTournament) {
        throw new CustomError(CONFLICT, NO_TOURNAMENT_FOUND(tournamentId));
      }

      // Create participants
      const pendingParticipants = [];
      participants.forEach((participant) => {
        const pendingParticipant = participantService.createParticipant(participant, tournamentId);
        pendingParticipants.push(pendingParticipant);
      });

      const createdParticipants = await Promise.all(pendingParticipants);

      // Send e-mails
      createdParticipants.forEach(async (participant) => {
        await mailService.sendRegisteredUser(
          participant.email, participant.tempPassword,
        );
      });

      // Find that tournament challenges
      const tournamentChallenges = await tournamentChallengeService
        .findTournamentChallengesByTournamentId(tournamentId);

      // Create team challenges
      const pendingTeamChallenges = [];
      tournamentChallenges.forEach((tournamentChallenge) => {
        const pendingTeamChallenge = teamChallengeService
          .createTeamChallenge(
            tournamentChallenge._id,
            tournamentChallenge.name,
            tournamentChallenge.number,
          );
        pendingTeamChallenges.push(pendingTeamChallenge);
      });

      const createdTeamChallenges = await Promise.all(pendingTeamChallenges);

      // Create team
      const createdParticipantsIds = createdParticipants.map((participant) => participant._id);
      const createdTeamChallengesIds = createdTeamChallenges.map(
        (teamChallenge) => teamChallenge._id,
      );
      const teamCaptain = createdParticipants.find(
        (participant) => participant.role === userRoles.CAPTAIN,
      );
      const createdTeam = await teamService.createTeam(
        name, createdParticipantsIds, createdTeamChallengesIds, teamCaptain._id, tournamentId,
      );

      // Update team challenges & participants (insert teamId property)
      const updateQuery = { $set: { teamId: createdTeam._id } };
      await teamChallengeService.updateManyTeamChallenges(createdTeamChallengesIds, updateQuery);

      await participantService.updateManyParticipants(createdParticipantsIds, updateQuery);

      return handleResponseSuccess(res, REGISTER_TEAM_SUCCESS, CREATED);
    } catch (error) {
      return handleResponseError(res, error);
    }
  }

  async function getTournamentTeams({ query: { tournamentId } }, res) {
    try {
      if (!tournamentId) {
        throw new CustomError(BAD_REQUEST, MISSING_QUERY_PROPERTIES('tournamentId'));
      }

      const tournamentTeams = await teamService.findTournamentTeams(tournamentId);

      return handleResponseSuccess(res, tournamentTeams);
    } catch (getTournamentTeamsError) {
      return handleResponseError(res, getTournamentTeamsError);
    }
  }

  return { createTeam, getTournamentTeams };
}

module.exports = teamsController();
