const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const orderJoiSchema = require('../order/order-schema');
module.exports = Joi.object({
    firstName  : Joi.string().required().min(5).max(255),
    lastName  : Joi.string().required().min(5).max(255),
    vehicle  : Joi.string().required().min(5).max(255),
    orders    : Joi.array().items(orderJoiSchema).default([]),
});