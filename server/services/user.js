class UserService {
  constructor({ userDao }) {
    this.userDao = userDao;
  }

  getUser = (id) => this.userDao.getUser(id);
  getUserViaEmail = (email) => this.userDao.getUserViaEmail(email);

  createUser = ({ email, password }) => {
    const userId = this.userDao.createUser(email, password);
    return userId;
  };
}

module.exports = UserService;
