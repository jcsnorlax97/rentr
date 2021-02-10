const db = require('./db');

const getWelcomeMessage = () => ({ message: 'Welcome to Rentr API!' });

const ping = async () => {
  const rows = await db.query('SELECT NOW()');
  const { now } = rows[0];
  console.log(`[*] Pong! Postgre DB is working! Current time is ${now}.`);
  return {
    message: 'Pong! Postgre DB is working!',
    now: `${now}`,
  };
};

module.exports = {
  getWelcomeMessage,
  ping,
};
