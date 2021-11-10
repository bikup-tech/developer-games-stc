require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const { urlencoded, json } = require('body-parser');
const debug = require('debug')('app');
const mongoose = require('mongoose');
const fileupload = require('express-fileupload');
const { Storage } = require('@google-cloud/storage');

const gcloud = new Storage({
  keyFilename: path.join(__dirname, 'silent-elevator-318614-4faa68606693.json'),
  projectId: process.env.GCLOUD_PROJECT_NAME || 'silent-elevator-318614',
});

const devGamesBucket = gcloud.bucket(process.env.GCLOUD_BUCKET_NAME);

// Routers
const authRouter = require('./src/routes/authRouter');
const profileRouter = require('./src/routes/profileRouter');
const teamsRouter = require('./src/routes/teamsRouter');
const tournamentChallengesRouter = require('./src/routes/tournamentChallengesRouter');
const teamChallengesRouter = require('./src/routes/teamChallengesRouter');
const participantsRouter = require('./src/routes/participantsRouter');
const uploadFilesRouter = require('./src/routes/uploadFilesRouter')(devGamesBucket);
const tournamentsRouter = require('./src/routes/tournamentsRouter');

const app = express();
const PORT = process.env.PORT || 4200;

debug(`>>> Starting server in -- ${process.env.NODE_ENV.toUpperCase()} -- mode <<<`);

if (process.env.NODE_ENV === 'production') {
  debug('--- Connecting to <PRODUCTION> database ---');
  mongoose.connect(
    'mongodb+srv://developer-games:developer-games@developer-games-cluster.f0myq.mongodb.net/developer-games?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
  );
} else {
  debug('--- Connecting to <DEV> database ---');
  mongoose.connect(
    'mongodb+srv://developer-games:developer-games-dev@developergames-devenv-c.mrnww.mongodb.net/developer-games?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
  );
}

app.use(cors());

app.use(urlencoded({ extended: true }));
app.use(json());

app.use(fileupload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/tournamentChallenges', tournamentChallengesRouter);
app.use('/api/teamChallenges', teamChallengesRouter);
app.use('/api/participants', participantsRouter);
app.use('/api/upload', uploadFilesRouter);
app.use('/api/tournaments', tournamentsRouter);

// const { encryptPassword } = require('./src/utils/bcryptUtils');
// const mailService = require('./src/services/mailService');

// app.get('/api/generatePassword', async (req, res) => {
//   const password = 'L0SV2I03uh';
//   const encrypted = await encryptPassword(password);

//   res.send(encrypted);
// });

// app.get('/api/sendMailToUser', async (req, res) => {
//   mailService.sendRegisteredUser('', '');

//   res.send(true);
// });

// app.get('/api/sendActivateTournament', async (req, res) => {
//   const { email } = req.query;
//   const mailService = require('./src/services/mailService');
//   await mailService.sendActivatedTournament(email);

//   res.send(true);
// });

app.get('/api/tournamentParticipants', async (req, res) => {
  const participantsRepository = require('./src/repositories/participantsRepository');
  const tournamentParticipants = await participantsRepository
    .getParticipantsByTournamentId('60be036d5695a3805e903f91');

  res.json(tournamentParticipants);
});

app.get('/api/checkEnv', (req, res) => {
  res.json({
    node_env: process.env.NODE_ENV,
    db_host_pro: process.env.DB_HOST_PRO,
    db_host_dev: process.env.DB_HOST_DEV,
  });
});

app.listen(PORT, () => debug(`Server running in port: ${PORT}`));
