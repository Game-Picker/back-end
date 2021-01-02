const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { jwtSecret } = require("./secret");
const Users = require("../users/user-model");
const { isValid } = require("../users/user-service");

router.post("/login", async (req, res) => {
  const credentials = req.body;
  const { email, password } = credentials;
  if (isValid(credentials)) {
    Users.findBy({ email: email })
      .then(([user]) => {
        if (user && bcrypt.compare(password, user.password)) {
          const token = makeToken(user);
          res.status(200).json({
            message: "Welcome to the API",
            token,
          });
        } else {
          res.status(401).json({
            message: "Invalid Credentials",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message,
          stack: err.stack,
        });
      });
  }
});

const makeToken = (user) => {
  const payload = {
    subject: user.id,
    email: user.email,
  };
  const options = {
    expiresIn: "2h",
  };
  return jwt.sign(payload, jwtSecret, options);
};

module.exports = router;
