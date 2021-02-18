const awilix = require('awilix');
const apiController = require('./controllers/api');
const userController = require('./controllers/user');
const userService = require('./services/user');
const userDao = require('./dao/user');
const listingController = require('./controllers/listing');
const listingService = require('./services/listing');
const listingDao = require('./dao/listing');
const dbPool = require('./db/db');

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY, // default injection mode
});

const setup = () => {
  container.register({
    apiController: awilix.asClass(apiController),
    userController: awilix.asClass(userController),
    userService: awilix.asClass(userService),
    userDao: awilix.asClass(userDao),
    listingController: awilix.asClass(listingController),
    listingService: awilix.asClass(listingService),
    listingDao: awilix.asClass(listingDao),
    dbPool: awilix.asValue(dbPool),
  });
};

module.exports = {
  container,
  setup,
};
