const buildMakeProduct = require('./product');
const productSchema    = require('./product-schema');
const productValidator = require('../validator/validator')(productSchema);

const makeProduct = buildMakeProduct(productValidator);
module.exports = makeProduct;
 