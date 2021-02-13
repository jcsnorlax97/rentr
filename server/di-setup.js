const awilix = require('awilix');
const userController = require('./controllers/user');
const userService = require('./services/user');
const userDao = require('./dao/user');

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY, // default injection mode
});

const setup = () => {
  container.register({
    userController: awilix.asClass(userController),
    userService: awilix.asClass(userService),
    userDao: awilix.asClass(userDao),
  });
};

module.exports = {
  container,
  setup,
};
