// *** [ Imports ] *** //
const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../secret/secret");
const Users = require("../users/user-model");

const restricted = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: "Need a token",
    });
  } else {
    jwt.verify(token, jwtSecret, (error, decoded) => {
      if (error) {
        return res.status(401).json({
          message: "Bad Token",
          errorMessage: error.message,
          stack: error.stack,
        });
      } else {
        console.log("Decoded Token: ", decoded);
        req.decodedJwt = decoded;
        next();
      }
    });
  }
};

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
  restricted,
  uniqueEmail,
  emailExists,
  validateCredentials,
};
