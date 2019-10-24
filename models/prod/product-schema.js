let Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = Joi.object({
    name  : Joi.string().required().min(5).max(255),
    description : Joi.string().required().min(5).max(255),
    price : Joi.number().required().greater(0),
    category : Joi.string().required().min(5).max(255)
});