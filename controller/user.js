const UserSchema = require('../model/User');
const _ = require('lodash');
const jsonwebtoken = require('jsonwebtoken');
const { validationResult, body } = require("express-validator");


const handleLogin = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(409).json({ message: errors.errors[0].msg });
    }
    else {
        UserSchema.findOne({ email: req.body.email }).then(user => {
            if (!_.isEmpty(user)) {
                if (user.password === req.body.password) {
                    console.log(user.password === req.body.password, 'asdd')
                    let token = jsonwebtoken.sign({
                        _id: user._id,
                        email: user.email
                    }, 'secretsecret', { expiresIn: '24h' });
                    res.header('token', token)
                    res.json({ status: 200, message: 'User Found', id: user.id, token });
                } else res.status(401).json({ status: 401, message: 'Invalid Password', });
            } else res.status(404).json({ message: 'User not found' });
        }).catch(err => {
            console.log(err, 'login')
            res.status(401).json({ status: 401, message: 'Unable to login' })
        })
    }
}


const handleSignup = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(409).json({ message: errors.errors[0].msg });
    }
    else {
        const userSchema = new UserSchema({
            email: req.body.email,
            password: req.body.password
        });
        userSchema.save().then(response => {
            if (response)
                res.json({ message: 'User created' });
            else res.status(403).json({ message: 'User already exist' });
        }).catch(err => {
            console.log('user creation:', err);
            res.status(500).json({ status: 500, message: 'User already exist' });
        });
    }

}

module.exports = {
    handleLogin, handleSignup
}