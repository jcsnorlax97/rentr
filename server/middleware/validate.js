const ApiError = require('../error/api-error');

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body);

  // req.body is invalid
  if (error) {
    next(ApiError.badRequest(error));
  }
  // req.body is valid
  req.body = value;
  next();
};

module.exports = validate;
