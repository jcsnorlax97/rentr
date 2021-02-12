const db = require('../db/db');

class UserDao {
  createUser = (email, password) =>
    db.query('INSERT INTO "User" (uEmail, uPassword) VALUES ($1, $2);', [
      email,
      password,
    ]);

  // getUser = (id) => {};
}

module.exports = new UserDao();
