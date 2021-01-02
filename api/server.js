const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const authRouter = require("../auth/auth-router");
const userRouter = require("../users/user-router");

const server = express();

server.use(express.json());
server.use(morgan("dev"));
server.use(helmet());
server.use(cors());

server.use("/auth", authRouter);
server.use("/api/users", userRouter);

module.exports = server;
