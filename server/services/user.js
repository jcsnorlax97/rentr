class UserService {
  constructor({ userDao }) {
    this.userDao = userDao;
  }

  createUser = ({ email, password }) =>
    this.userDao.createUser(email, password);
  // getUser = (email) => userDao.getUser(email);
}

module.exports = UserService;
