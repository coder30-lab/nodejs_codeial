const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user_controller');
router.get('/profile', usersController.profile);
router.get('/friend', usersController.friend);
router.get('/sign_up', usersController.signUp);
router.get('/sign_in', usersController.signIn);
router.post('/create', usersController.create);
router.post('/users/create-session', usersController.createSession);



module.exports = router;