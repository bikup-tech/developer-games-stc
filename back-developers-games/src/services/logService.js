const logModel = require('../models/logModel');

function logService() {
  async function createLog(type, data, status) {
    const tempLog = {
      type, data, date: new Date(), status,
    };

    return logModel.create(tempLog);
  }

  return { createLog };
}

module.exports = logService();
