const joi = require('@hapi/joi');

// @min_price: add .allow('') if want the field to be empty string
const schema = joi.object({
  min_price: joi.number().positive().default(null),
  max_price: joi.number().positive().default(null),
  min_num_bathroom: joi.number().positive().default(null),
  max_num_bathroom: joi.number().positive().default(null),
  min_num_bedroom: joi.number().positive().default(null),
  max_num_bedroom: joi.number().positive().default(null),
  is_laundry_available: joi.boolean().default(null),
  is_pet_allowed: joi.boolean().default(null),
  is_parking_available: joi.boolean().default(null),
  keywords: joi.string().regex(/^[a-zA-Z0-9]*$/).allow("").default("")
});

module.exports = schema;
