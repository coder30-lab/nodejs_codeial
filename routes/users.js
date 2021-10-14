const express = require('express');
// const {
//     authenticate
// } = require('passport');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/user_controller');
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.get('/friend', usersController.friend);
router.get('/sign_up', usersController.signUp);
router.get('/sign_in', usersController.signIn);
router.post('/create', usersController.create);
//use passport as a middle ware to authenticate
router.post('/create-session', passport.authenticate('local', {
    failureRedirect: '/users/sign_in'
}), usersController.createSession);


router.get('/sign_out', usersController.destroySession);
module.exports = router;