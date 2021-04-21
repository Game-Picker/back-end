const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const authRouter = require("../auth/auth-router");
const userRouter = require("../users/user-router");
const gamesRouter = require("../video-games/vg-router");
const developersRouter = require("../developers/developers-router");

const server = express();

server.get("/", (req, res) => {
  res.send(`
    <h1>Postgres Game Picker API Documentation</h1>
    <ul>
        <li>Base URL: https://gamers-choice.herokuapp.com/</li>
    </ul>
    <br />
    <h3>Authentication:</h3>
    <ul>
        <li>Post - /auth/register</li>
        <li>Post - /auth/login</li>
    </ul>
    <br />
    <h3>Users:</h3>
    <ul>
        <li>Get - /api/users - Gets all user profiles (Protected)</li>
        <li>Get - /api/users/:id - Gets a specified user profile (Protected)</li>
        <li>Put - /api/users/:id - Updates a specified user's profile (Protected)</li>
        <li>Delete - /api/users/:id - Deletes a specified user's profile (Protected)</li>
    </ul>
    <br />
    <h3>Video Games:</h3>
    <ul>
        <li>Get - /api/games - Gets all the games</li>
        <li>Get - /api/games/:id - Gets a specified game</li>
        <li>Post - /api/games - Creates a new game (Protected)</li>
        <li>Put - /api/games/:id - Updates a specified game (Protected)</li>
        <li>Delete - /api/games/:id - Deletes a specified game (Protected)</li>
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
server.use("/api/developers", developersRouter);

server.use((err, req, res) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    error: err,
  });
});

module.exports = server;
