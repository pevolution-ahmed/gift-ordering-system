let Joi = require('@hapi/joi');

module.exports = Joi.object({
    street  : Joi.string().required().min(5).max(255),
    country : Joi.string().required().min(5).max(255),
    city : Joi.string().required().min(5).max(255),
    state: Joi.string().required().min(5).max(255),
    zipCode : Joi.number().integer().required()
});