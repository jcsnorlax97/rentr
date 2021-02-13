class UserService {
  constructor({ userDao }) {
    this.userDao = userDao;
  }

  createUser = ({ email, password }) => {
    const userId = this.userDao.createUser(email, password);
    return userId;
  };
  // getUser = (email) => userDao.getUser(email);
}

module.exports = UserService;
