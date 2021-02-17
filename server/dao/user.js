class UserDao {
  constructor({ dbPool }) {
    this.dbPool = dbPool;
  }

  getUser = async (id) => {
    const {
      rows,
    } = await this.dbPool.query('SELECT * FROM rentr_user WHERE id = $1;', [
      id,
    ]);
    const user = rows && rows.length >= 1 ? rows[0] : null;
    return user;
  };

  createUser = async (email, password) => {
    const {
      rows,
    } = await this.dbPool.query(
      'INSERT INTO "User" (uEmail, uPassword) VALUES ($1, $2) RETURNING uId;',
      [email, password]
    );

    const userId = rows[0].uid;
    return userId;
  };
  // getUser = (id) => {};
}

module.exports = UserDao;
