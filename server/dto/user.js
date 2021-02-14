const joi = require('@hapi/joi');

const schema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

module.exports = schema;
