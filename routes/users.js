var express = require('express');
const { handleLogin, handleSignup } = require('../controller/user');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/login',handleLogin)
router.post('/register',handleSignup)

module.exports = router;
