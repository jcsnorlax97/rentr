const db = require('../db/db');
const ApiError = require('../error/api-error');

class ApiController {
  getWelcomeMessage = async (req, res) => {
    res.status(200).json({ message: 'Welcome to Rentr API!' });
  };

  ping = async (req, res, next) => {
    try {
      const rows = await db.query('SELECT NOW()');
      const { now } = rows[0];
      const results = {
        message: 'Pong! Postgre DB is working!',
        now: `${now}`,
      };
      res.status(200).json(results);
    } catch (err) {
      next(ApiError.internal(`${err}`));
    }
  };
}

module.exports = ApiController;
