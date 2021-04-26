// *** [ Imports ] *** //
const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../secret/secret");
const Users = require("../users/user-model");

const uniqueEmail = async (req, res, next) => {
  const { email } = req.body;
  console.log("EMAIL: ", email);
  const user = await Users.findBy(email);
  console.log("USER: ", user[0]);

  if (user[0]) {
    res.status(400).json({
      message: "Email is Already Taken",
    });
  } else {
    next();
  }
};

const emailExists = async (req, res, next) => {
  const { email } = req.body;
  const user = await Users.findBy(email);

  if (!user) {
    res.status(400).json({ message: "Invalid Credentials" });
  } else {
    req.user = user;
    next();
  }
};

const validateCredentials = (req, res, next) => {
  if (
    !req.body.email ||
    !req.body.password ||
    typeof req.body.email !== "string" ||
    typeof req.body.password !== "string" ||
    req.body.email.length < 5 ||
    req.body.password.length < 5
  ) {
    res.status(400).json({
      message: "Email and Password Required",
    });
  } else {
    next();
  }
};

// *** [ Exports ] *** //
module.exports = {
  uniqueEmail,
  emailExists,
  validateCredentials,
};
