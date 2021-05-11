const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const { jwtSecret } = require('./secret');
const Users = require('../users/user-model');
const { isValid } = require('../users/user-service');

router.get('/register', async (req, res) => {
    const credentials = req.body;

    console.log(credentials);

    if (isValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 14;
        const hash = bcrypt.hashSync(credentials.password, rounds);
        credentials.password = hash;
        Users.create(credentials)
            .then(user => {
                res.status(201).json({ data: user })
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message,
                    stack: err.stack
                })
            })
    } else {
        res.status(400).json({
            message: 'Please provide email and password'
        });
    };
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    console.log({ email, password });

    if (isValid(req.body)) {
        Users.findBy({ email: email })
            .then(([user]) => {
                console.log(user);
                if (user && bcrypt.compare(password, user.password)) {
                    const token = makeToken(user);
                    res.status(200).json({
                        message: 'Welcome to the API', token
                    })
                } else {
                    res.status(401).json({
                        message: 'Invalid Credentials'
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message,
                    stack: err.stack
                })
            })
    } else {
        res.status(400).json({
            message: 'Please provide a valid email & password'
        });
    };
});

const makeToken = user => {
    const payload = {
        subject: user.id,
        email: user.email
    }
    const options = {
        expiresIn: '1h'
    }
    return jwt.sign(payload, jwtSecret, options)
};

module.exports = router;