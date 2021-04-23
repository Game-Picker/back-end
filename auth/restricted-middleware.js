// *** [ Imports ] *** //
const jwt = require("jsonwebtoken");

const { jwtSecret } = require("./secret");

// *** [ Function To Restrict Use Of Routes By Unauthorized Users ] *** //
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

// *** [ Exports ] *** //
module.exports = {
  restricted,
};
