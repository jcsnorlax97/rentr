const joi = require('@hapi/joi');

const schema = joi.object({
  content: joi.string().required().max(1000),
});

module.exports = schema;
