const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const asyncError = require('../middlewares/asyncError.middleware');
const checkAuth = require('../middlewares/checkAuth.middleware');

// ----------- CRUD operations Handlers -------------------------------------
router.get('/orders',checkAuth,asyncError(orderController.index));
router.post('/orders',checkAuth,asyncError(orderController.create));
router.put('/orders/:id',checkAuth,asyncError(orderController.update));
router.delete('/orders/:id',checkAuth,asyncError(orderController.remove));
// ---------------------------------------------------------------------------

module.exports = router;
