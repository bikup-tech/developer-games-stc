const { INTERNAL_ERROR } = require('../constants/statusCodes');

module.exports = (res, error = {}) => {
  res.status(error.status || INTERNAL_ERROR);
  return res.json({
    status: error.status || INTERNAL_ERROR,
    message: error.message || 'Unkown error',
  });
};
