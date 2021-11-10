const bcrypt = require('bcrypt');

const saltRounds = 10;

async function encryptPassword(plainPassword) {
  const generatedSalt = await bcrypt.genSalt(saltRounds);
  const generatedPassword = await bcrypt.hash(plainPassword, generatedSalt);

  return generatedPassword;
}

async function comparePasswords(plainPassword, hash) {
  return bcrypt.compare(plainPassword, hash);
}

module.exports = {
  encryptPassword,
  comparePasswords,
};
