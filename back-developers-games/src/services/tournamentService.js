const tournamentModel = require('../models/tournamentModel');

// Constants
const { BAD_REQUEST, CONFLICT } = require('../constants/statusCodes');
const { MISSING_PROPERTIES, NO_TOURNAMENT_NAME_FOUND } = require('../constants/responseMessages');
const logStatus = require('../constants/logStatus');
const logTypes = require('../constants/logTypes');

// Services
const logService = require('./logService');

// Utils
const CustomError = require('../utils/CustomError');
const participantsRepository = require('../repositories/participantsRepository');
const mailService = require('./mailService');

function tournamentService() {
  function findTournamentById(tournamentId) {
    if (!tournamentId) {
      throw new CustomError(BAD_REQUEST, MISSING_PROPERTIES('tournamentId'));
    }

    const filter = { _id: tournamentId };
    return tournamentModel.findOne(filter);
  }

  async function findTournamentByName(tournamentName) {
    const filter = { name: tournamentName };

    return tournamentModel.findOne(filter);
  }

  async function updateTournamentIsActive(tournamentName, isActive) {
    const filter = { name: tournamentName };
    const query = {
      $set: {
        isActive,
      },
    };
    const options = { new: true, useFindAndModify: false };

    return tournamentModel.findOneAndUpdate(filter, query, options);
  }

  async function activateTournament(tournamentName) {
    try {
      const tournament = await findTournamentByName(tournamentName);

      if (!tournament) {
        throw new CustomError(CONFLICT, NO_TOURNAMENT_NAME_FOUND(tournamentName));
      }

      const logData = {
        startsAt: new Date(),
        tournamentId: tournament._id,
        tournamentName: tournament.name,
      };

      logService.createLog(
        logTypes.ACTIVATE_TOURNAMENT_START,
        logData,
        logStatus.STARTING_ACTIVATION,
      );

      await updateTournamentIsActive(tournamentName, true);

      const tournamentParticipants = await participantsRepository
        .getParticipantsByTournamentId(tournament._id);

      tournamentParticipants.forEach(async (participant, index) => {
        setTimeout(async () => {
          await mailService.sendActivatedTournament(participant.email);
        }, index * 5000);
      });

      return true;
    } catch (error) {
      const logData = {
        startsAt: new Date(),
      };

      logService.createLog(
        logTypes.ACTIVATE_TOURNAMENT_ERROR,
        logData,
        logStatus.ERROR,
      );
      return false;
    }
  }

  return {
    findTournamentById, findTournamentByName, updateTournamentIsActive, activateTournament,
  };
}

module.exports = tournamentService();
