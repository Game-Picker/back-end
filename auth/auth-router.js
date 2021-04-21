const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { jwtSecret } = require("./secret");
const Users = require("../users/user-model");

router.post("/login", async (req, res, next) => {
  const credentials = req.body;
  const { email, password } = credentials;

  try {
    const user = await Users.findBy({ email: email });
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
  } catch (err) {
    next(err);
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
