var express = require('express');
const { handleLogin, handleSignup } = require('../controller/user');
var router = express.Router();
const { check } = require("express-validator");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/login',
    [
        //this array is middleware to validate req body
        check("email").trim().isEmail().withMessage("Enter Valid Email"),
        check("password")
            .isLength({ min: 5 })
            .withMessage("Password should be minimum 5 characters"),
    ]
    , handleLogin)
router.post('/register',
    [
        //this array is middleware to validate req body
        check("email").trim().isEmail().withMessage("Enter Valid Email"),
        check("password")
            .isLength({ min: 5 })
            .withMessage("Password should be minimum 5 characters"),
    ],
    handleSignup)

module.exports = router;
