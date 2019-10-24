const express = require('express');
const router = express.Router();
const userController =require('../controllers/user.controller');
const asyncError = require('../middlewares/asyncError.middleware');
const checkAuth = require('../middlewares/checkAuth.middleware');

// ---------- Authentication  Handlers -----------------
router.post('/register', asyncError(userController.signUp));
router.post('/login', asyncError(userController.loggingIn));
router.post('/logout', asyncError(userController.loggingOut));
//------------------------------------------------------

// ----------- CRUD operations Handlers ----------------
router.get('/users',checkAuth,asyncError(userController.index));
router.post('/users',checkAuth,asyncError(userController.create));
router.put('/users/:id',checkAuth,asyncError(userController.update));
router.delete('/users/:id',checkAuth,asyncError(userController.remove));
// -----------------------------------------------------
module.exports = router;
