const ApiError = require('../error/api-error');

const validateReqQueryString = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.query);

  // req.query is invalid!
  if (error) {
    next(ApiError.badRequest(error));
  }

  // req.query is valid!
  req.query = value;
  next();
};

module.exports = validateReqQueryString;
