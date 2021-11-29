const AdmZip = require('adm-zip');
// const fs = require('fs');
const { BAD_REQUEST, NOT_FOUND } = require('../constants/statusCodes');
const { MISSING_QUERY_PROPERTIES, MISSING_PROPERTIES } = require('../constants/responseMessages');
const teamChallengeService = require('../services/teamChallengeService');
// Utils
const CustomError = require('../utils/CustomError');
const handleResponseError = require('../utils/handleResponseError');
const handleResponseSuccess = require('../utils/handleResponseSuccess');

function teamChallengesController(gcBucket) {
  async function getTeamChallenges({ query: { teamId } }, res) {
    try {
      if (!teamId || teamId === 'undefined') {
        throw new CustomError(BAD_REQUEST, MISSING_QUERY_PROPERTIES('teamId'));
      }

      const foundTeamChallenges = await teamChallengeService.findTeamChallenges(teamId);

      return handleResponseSuccess(res, foundTeamChallenges);
    } catch (getTeamChallengesError) {
      return handleResponseError(res, getTeamChallengesError);
    }
  }

  async function getAdminTemplateChallenges({ params: { tournamentId } }, res) {
    try {
      if (!tournamentId) {
        throw new CustomError(BAD_REQUEST, MISSING_PROPERTIES('tournamentId'));
      }

      const foundTeamChallenges = await teamChallengeService
        .findAdminTemplateChallengesByTournamentId(tournamentId);

      return handleResponseSuccess(res, foundTeamChallenges);
    } catch (getTeamChallengesError) {
      return handleResponseError(res, getTeamChallengesError);
    }
  }

  async function getCompletedChallengesByChallengeId(
    { params: { tournamentChallengeId } }, res,
  ) {
    try {
      if (!tournamentChallengeId) {
        throw new CustomError(BAD_REQUEST, MISSING_PROPERTIES('tournamentChallengeId'));
      }

      const completedChallenges = await teamChallengeService
        .findCompletedTeamChallengesByChallengeId(tournamentChallengeId);

      return handleResponseSuccess(res, completedChallenges);
    } catch (error) {
      return handleResponseError(res, error);
    }
  }

  async function zipCompletedChallengesByTournamentChallengeId(
    { params: { tournamentChallengeId } }, res,
  ) {
    try {
      if (!tournamentChallengeId) {
        throw new CustomError(NOT_FOUND, MISSING_PROPERTIES('tournamentChallengeId'));
      }
      const completedChallenges = await teamChallengeService
        .findCompletedTeamChallengesByChallengeId(tournamentChallengeId);

      if (!completedChallenges.length) {
        return handleResponseSuccess(res, false);
      }

      const zip = new AdmZip();
      completedChallenges.forEach(async (selectedChallenge, index) => {
        let { filename } = selectedChallenge;

        filename = `${selectedChallenge.teamId?.name}-${filename}`;
        const downloadedFile = await gcBucket.file(selectedChallenge.gcloudName).download();
        await zip.addFile(filename, downloadedFile[0]);

        if (index === completedChallenges.length - 1) {
          // await zip.writeZip(path.join(__dirname, './downloads/my_file.zip'));
          const gcloudFileName = `c_challenge-${selectedChallenge.challengeNumber}.zip`;
          const fileHandle = gcBucket.file(gcloudFileName);
          const [fileExists] = await fileHandle.exists();

          if (fileExists) {
            await gcBucket.file(gcloudFileName).delete();
          }

          await fileHandle.save(zip.toBuffer());

          return handleResponseSuccess(res, `https://storage.googleapis.com/developer-games-bucket/${gcloudFileName}`);
        }
      });
    } catch (error) {
      return handleResponseError(res, error);
    }
  }
  return {
    getTeamChallenges,
    getCompletedChallengesByChallengeId,
    getAdminTemplateChallenges,
    zipCompletedChallengesByTournamentChallengeId,
  };
}

module.exports = teamChallengesController;
