class UserDao {
  constructor({ dbPool }) {
    this.dbPool = dbPool;
  }

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
