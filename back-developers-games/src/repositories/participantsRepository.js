const participantModel = require('../models/participantModel');

function participantsRepository() {
  async function getParticipantsByTournamentId(tournamentId) {
    return participantModel.find({ tournamentId });
  }

  return { getParticipantsByTournamentId };
}

module.exports = participantsRepository();
