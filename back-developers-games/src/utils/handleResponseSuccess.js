const { OK } = require('../constants/statusCodes');

module.exports = (res, payload, statusCode = OK) => {
  res.status(statusCode);
  return res.json(payload);
};
