class UserService {
  constructor({ userDao }) {
    this.userDao = userDao;
  }

  getUser = (id) => this.userDao.getUser(id);

  createUser = ({ email, password }) => {
    const userId = this.userDao.createUser(email, password);
    return userId;
  };
}

module.exports = UserService;
