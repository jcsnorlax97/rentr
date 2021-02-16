class UserDao {
  constructor({ dbPool }) {
    this.dbPool = dbPool;
  }

  createUser = async (email, password) => {
    const {
      rows,
    } = await this.dbPool.query(
      'INSERT INTO rentr_user (email, password) VALUES ($1, $2) RETURNING id;',
      [email, password]
    );

    const userId = rows[0].id;
    return userId;
  };
  // getUser = (id) => {};
}

module.exports = UserDao;
