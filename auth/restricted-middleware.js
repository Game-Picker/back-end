const jwt = require('jsonwebtoken');

const { jwtSecret } = require('./secret');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    console.log(token);

    if (!token) {
        return res.status(401).json({
            message: 'Need a token'
        })
    } else {
        jwt.verify(token, jwtSecret, (error, decoded) => {
            if (error) {
                return res.status(401).json({
                    message: 'Bad token',
                    errorMessage: error.message,
                    stack: error.stack
                })
            } else {
                console.log('Decoded Token: ', decoded);
                req.decodedJwt = decoded;
                next();
            };
        });
    };
};