class UserService {
  constructor({ userDao }) {
    this.userDao = userDao;
  }

  getUserViaId = (id) => this.userDao.getUserViaId(id);

  getUserViaEmail = (email) => this.userDao.getUserViaEmail(email);

  createUser = ({ email, password }) => {
    const userId = this.userDao.createUser(email, password);
    return userId;
  };
}

module.exports = UserService;
