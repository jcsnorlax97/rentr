const ApiError = require('../error/api-error');

class ApiController {
  constructor({ dbPool }) {
    this.dbPool = dbPool;
  }

  getWelcomeMessage = async (req, res) => {
    res.status(200).json({ message: 'Welcome to Rentr API!' });
  };

  ping = async (req, res, next) => {
    try {
      const results = await this.dbPool.query('SELECT NOW()');
      const { now } = results.rows[0];
      const pong = {
        message: 'Pong! Postgre DB is working!',
        now: `${now}`,
      };
      res.status(200).json(pong);
    } catch (err) {
      next(ApiError.internal(`${err}`));
    }
  };
}

module.exports = ApiController;
