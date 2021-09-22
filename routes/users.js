const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user_controller');
router.get('/profile', usersController.profile);
router.get('/friend', usersController.friend);
module.exports = router;