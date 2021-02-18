const joi = require('@hapi/joi');

const schema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  numBedroom: joi.string().required(),
  numBathroom: joi.string().required(),
});

module.exports = schema;
