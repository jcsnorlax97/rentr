const joi = require('@hapi/joi');

const schema = joi.object({
  title: joi.string().required().max(100),
  price: joi.number().required().positive(),
  num_bedroom: joi.number().required().max(10),
  num_bathroom: joi.number().required().max(10),
  is_laundry_available: joi.bool().required(),
  is_pet_allowed: joi.bool().required(),
  is_parking_available: joi.bool().required(),
  images: joi.array().required().items(joi.string()),
  description: joi.string().required().allow('').max(5000),
});

module.exports = schema;
