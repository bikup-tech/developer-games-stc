// constants
const { BAD_REQUEST, CONFLICT } = require('../constants/statusCodes');
const {
  MISSING_PROPERTIES,
  NO_TOURNAMENT_NAME_FOUND,
} = require('../constants/responseMessages');

// utils
const CustomError = require('../utils/CustomError');
const handleResponseError = require('../utils/handleResponseError');
const handleResponseSuccess = require('../utils/handleResponseSuccess');

const tournamentService = require('../services/tournamentService');

function tournamentController() {
  async function getTournamentByName({ params: { tournamentName } }, res) {
    try {
      const foundTournament = await tournamentService.findTournamentByName(
        tournamentName,
      );

      if (!foundTournament) {
        throw new CustomError(
          CONFLICT,
          NO_TOURNAMENT_NAME_FOUND(tournamentName),
        );
      }

      return handleResponseSuccess(res, foundTournament);
    } catch (getTournamentError) {
      return handleResponseError(res, getTournamentError);
    }
  }

  async function updateTournament({ params, body }, res) {
    const { tournamentName } = params;
    const { isActive } = body;
    try {
      if (!tournamentName || !Object.keys(body).length) {
        throw new CustomError(
          BAD_REQUEST,
          MISSING_PROPERTIES('tournamentName or isActive'),
        );
      }
      const updatedTournament = await tournamentService.updateTournamentIsActive(
        tournamentName,
        isActive,
      );

      return handleResponseSuccess(res, updatedTournament);
    } catch (updateTournamentError) {
      return handleResponseError(res, updateTournamentError);
    }
  }

  // eslint-disable-next-line consistent-return
  async function activateTournament({ params: { tournamentName } }, res) {
    try {
      if (!tournamentName) {
        throw new CustomError(BAD_REQUEST, MISSING_PROPERTIES('tournamentName'));
      }

      await tournamentService.activateTournament(tournamentName);

      await handleResponseSuccess(res, true);
    } catch (activateTournamentError) {
      return handleResponseError(res, activateTournamentError);
    }
  }

  return { getTournamentByName, updateTournament, activateTournament };
}

module.exports = tournamentController();
