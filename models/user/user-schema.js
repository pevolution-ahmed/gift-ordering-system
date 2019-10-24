let Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = Joi.object({
    firstName : Joi.string().required().min(5).max(255),
    lastName  : Joi.string().required().min(5).max(255),
    email     : Joi.string().required().min(5).max(255).email(),
    password  : Joi.string().required().min(5).max(255),
    birthday  : Joi.date().required().iso(),
    gender    : Joi.string().valid(...['male','female']),
    address   : Joi.object({
      street : Joi.string().required().min(5).max(255),
      country: Joi.string().required().min(5).max(255),
      city   : Joi.string().required().min(5).max(255),
      state  : Joi.string().required().min(5).max(255),
      zipCode: Joi.number().integer().min(5)
    })
  });

