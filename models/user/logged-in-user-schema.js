let Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = Joi.object({
    email     : Joi.string().required().min(5).max(255).email(),
    password  : Joi.string().required().min(5).max(255)
});