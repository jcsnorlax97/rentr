const db = require('../db/db');

class ApiController {
  constructor() {
    this.getWelcomeMessage = this.getWelcomeMessage.bind(this);
    this.ping = this.ping.bind(this);
  }

  getWelcomeMessage = async (req, res) => {
    res.status(200).json({ message: 'Welcome to Rentr API!' });
  };

  ping = async (req, res) => {
    try {
      const rows = await db.query('SELECT NOW()');
      const { now } = rows[0];
      console.log(`[*] Pong! Postgre DB is working! Current time is ${now}.`);
      const results = {
        message: 'Pong! Postgre DB is working!',
        now: `${now}`,
      };
      res.status(200).json(results);
    } catch (err) {
      res.status(500).json({ message: `${err}'` });
    }
  };
}

module.exports = new ApiController();
