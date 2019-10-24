const buildMakeOrder = require('./order');
const orderSchema = require('./order-schema');
const orderValidator = require('../validator/validator')(orderSchema);

module.exports = buildMakeOrder(orderValidator);