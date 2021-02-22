const jwt = require('jsonwebtoken');
const ApiError = require('../error/api-error');

const validateLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (err) {
    // Invalid auth token, meaning not logged in
    next(ApiError.unAuthenticated('You need to be logged in to do this.'));
  }
};

module.exports = validateLoggedIn;
