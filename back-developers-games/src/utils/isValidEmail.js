function isValidEmail(email) {
  if (email.includes('@') && email.includes('.')) {
    return true;
  }
  return false;
}

module.exports = isValidEmail;
