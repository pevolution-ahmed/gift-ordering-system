var express = require('express');
var router = express.Router();
const productController = require('../controllers/product.controller');
const asyncError = require('../middlewares/asyncError.middleware');
const checkAuth = require('../middlewares/checkAuth.middleware');

// ------------- Give an Order To an Unbusy driver---------------------------------------
router.get('/products/give-order/:id',checkAuth,asyncError(productController.sendOrder));
// --------------------------------------------------------------------------------------

// ----------- CRUD operations Handlers --------------------------------------
router.get('/products',asyncError(productController.index));
router.post('/products',checkAuth,asyncError(productController.create));
router.put('/products/:id',checkAuth,asyncError(productController.update));
router.delete('/products/:id',checkAuth,asyncError(productController.remove));
// ---------------------------------------------------------------------------

module.exports = router;
