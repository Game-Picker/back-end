// *** [ Imports ] *** //
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { jwtSecret } = require("../secret/secret");
const Users = require("../users/user-model");
const { uniqueEmail, emailExists } = require("../middleware/auth-middleware");

// *** [ Function To Create A Token ] *** //
const makeToken = (user) => {
  const payload = {
    subject: user.id,
    email: user.email,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, jwtSecret, options);
};

// *** [ Register Route] *** //
router.post("/register", uniqueEmail, async (req, res, next) => {
  try {
    const { first_name, last_name, email, password, admin } = req.body;
    console.log("EMAIL: ", email);
    console.log("PASSWORD: ", password);
    const newUser = await Users.insert({
      first_name,
      last_name,
      email,
      password: bcrypt.hashSync(password, process.env.BCRYPT_ROUNDS),
      admin,
    });
    console.log("NEW USER: ", newUser);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

// *** [ Login Route ] *** //
router.post("/login", emailExists, async (req, res, next) => {
  try {
    const {
      body: { password },
      user,
    } = req;
    if (bcrypt.compareSync(password, user.password)) {
      res.json({
        message: `Welcome to the API ${user.first_name} ${user.last_name}`,
        token: makeToken(user),
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

// *** [ Exports ] *** //
module.exports = router;
