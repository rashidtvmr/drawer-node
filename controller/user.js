const UserSchema = require('../model/User');
const _ = require('lodash');
const jsonwebtoken = require('jsonwebtoken');


const handleLogin = (req, res) => {
    console.log('payload', req.body);
    if (req.body.email.length > 0) {
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
    console.log('payload', req.body);
    const userSchema = new UserSchema({
        email: req.body.email,
        password: req.body.password
    });
    userSchema.save().then(response => {
        if (response)
            res.json({ message: 'User created' });
        else res.status(403).json({ message: 'User already created' });
    }).catch(err => {
        console.log('user creation:', err);
        res.status(500).json({ status: 500, message: 'User not created' });
    });
}

module.exports = {
    handleLogin, handleSignup
}