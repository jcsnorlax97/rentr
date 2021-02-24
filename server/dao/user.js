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

    return rows && rows.length >= 1 ? rows[0] : null;
  };

  getUserViaEmail = async (email) => {
    const {
      rows,
    } = await this.dbPool.query('SELECT * FROM rentr_user WHERE email = $1;', [
      email,
    ]);

    return rows && rows.length >= 1 ? rows[0] : null;
  };

  createUser = async (email, password) => {
    const {
      rows,
    } = await this.dbPool.query(
      'INSERT INTO rentr_user (email, password) VALUES ($1, $2) RETURNING id;',
      [email, password]
    );

    return rows[0].id;
  };
}

module.exports = UserDao;
