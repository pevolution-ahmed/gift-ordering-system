const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driver.controller');
const asyncError = require('../middlewares/asyncError.middleware');
const checkAuth = require('../middlewares/checkAuth.middleware');

// ----------- CRUD operations Handlers -----------------------------------
router.get('/drivers',checkAuth,asyncError(driverController.index));
router.post('/drivers',checkAuth,asyncError(driverController.create));
router.put('/drivers/:id',checkAuth,asyncError(driverController.update));
router.delete('drivers/:id',checkAuth,asyncError(driverController.remove));
// -------------------------------------------------------------------------

module.exports = router;
