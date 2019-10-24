const buildMakeDriver = require('./driver');
const driverSchema    = require('./driver-schema');
const driverValidator = require('../validator/validator')(driverSchema);

const makeDriver = buildMakeDriver(driverValidator);
module.exports = makeDriver;
 