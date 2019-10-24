const buildMakeAddress = require('./Address');
const addressSchema    = require('./Address-schema');
const addressValidator = require('../validator/validator')(addressSchema);

const makeAddress = buildMakeAddress(addressValidator);
module.exports = makeAddress;
 