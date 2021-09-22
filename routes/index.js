var express = require('express');
const router = express.Router();
//var app = express();

const homeController = require('../controllers/home_controller');


// respond with "hello world" when a GET request is made to the homepage
// app.get('/', function(req, res) {
//     res.send('hello world')
// })

router.get('/', homeController.home);
module.exports = router;