const userDao = require('../dao/user');

class UserService {
  createUser = ({ email, password }) => userDao.createUser(email, password);
  // getUser = (email) => userDao.getUser(email);
}

module.exports = new UserService();
