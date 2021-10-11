const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');
const postController = require('../controllers/post_controller');


router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
//for any further route
//router.use('/routername', require('./routerFile'));

module.exports = router;