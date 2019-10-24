let Joi = require('./node_modules/@hapi/joi');
Joi.objectId = require('./node_modules/joi-objectid')(Joi);

module.exports = Joi.object({
    name  : Joi.string().required().min(5).max(255),
    description : Joi.string().required().min(5).max(255),
    price : Joi.number().required().greater(0),
    category : Joi.string().required().min(5).max(255)
});