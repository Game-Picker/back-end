const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const authRouter = require("../auth/auth-router");
const userRouter = require("../users/user-router");
const gamesRouter = require("../video-games/vg-router");

const server = express();

server.get("/", (req, res) => {
  res.send(`
    <h1>Postgres Game Picker API Documentation</h1>
    <br />
    <ul>
        <li>Base URL: https://gamers-choice.herokuapp.com/</li>
    </ul>
    <br />
    <h3>Authentication:</h3>
    <br />
    <ul>
        <li>Post - /auth/register</li>
        <li>Post - /auth/login</li>
    </ul>
  `);
});

server.use(express.json());
server.use(morgan("dev"));
server.use(helmet());
server.use(cors());

server.use("/auth", authRouter);
server.use("/api/users", userRouter);
server.use("/api/games", gamesRouter);

module.exports = server;
