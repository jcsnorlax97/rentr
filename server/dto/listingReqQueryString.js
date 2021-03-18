const joi = require('@hapi/joi');

// @min_price: add .allow('') if want the field to be empty string
const schema = joi.object({
  min_price: joi.number().positive(),
  max_price: joi.number().positive(),
  min_num_bathroom: joi.number().positive(),
  max_num_bathroom: joi.number().positive(),
  min_num_bedroom: joi.number().positive(),
  max_num_bedroom: joi.number().positive(),
});

module.exports = schema;
