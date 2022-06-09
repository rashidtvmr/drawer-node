const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            const tokenStatus = jwt.verify(req.headers['authorization'].split(' ')[1],'secretsecret');
            req.user={};
            req.user.id = tokenStatus._id;
            next();
        } catch (error) {
            console.log('toek parsing error ',error)
            res.status(401).json({ status: 401, message: 'Invalid Token' });
        }
    } else {
        res.status(401).json({ status: 401, message: 'Unauthorized' })
    }
}