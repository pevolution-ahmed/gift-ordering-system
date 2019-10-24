let Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const joiProductSchema = require('../Product/product-schema');
module.exports = Joi.object({
    userId    : Joi.objectId().required(),
    quantity  : Joi.number().integer().default(0).required(),
    date      : Joi.date().required(),
    totalPrice: Joi.number().required().default(0),
    location: Joi.string().required(),
    contactInformation: Joi.string().required().min(5).max(255),
    products : Joi.array().items(joiProductSchema).required().default([])
});