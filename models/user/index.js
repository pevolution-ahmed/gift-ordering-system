const userMake = require('./user');
const userSchema    = require('./user-schema');
const userValidator = require('../validator/validator')(userSchema);

const addressSchema = require('../address/address-schema');
const addressValidator = require('../validator/validator')(addressSchema);

const loggedInUserSchema    = require('./logged-in-user-schema');
const loggedInUserValidator = require('../validator/validator')(loggedInUserSchema);

const buildMakeAddress = require('../address/address');

const makeUser = userMake.buildMakeUser(userValidator,buildMakeAddress(addressValidator));
const makeLoggedInUser = userMake.buildMakeLoggedInUser(loggedInUserValidator);
module.exports = {makeUser,makeLoggedInUser};
 