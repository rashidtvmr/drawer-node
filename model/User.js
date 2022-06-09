const jsonwebtoken = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String
});



module.exports = mongoose.model('users', userSchema);

userSchema.methods.generateAuthToken = function () {
    let token = jsonwebtoken.sign({
        _id: this._id,
        email: this.email
    }, 'secretsecret', { expiresIn: '30 m' });
    return token;
}