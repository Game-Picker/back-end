// *** [ Imports ] *** //
const cookieParser = require("cookie-parser");
const { Store } = require("express-session");
const createError = require("http-errors");
const session = require("express-session");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const { jwtSecret } = require("./secret/secret");
const knex = require("../data/db-config");

const indexRouter = require("./index-router");
const authRouter = require("./auth/auth-router");
const userRouter = require("./users/user-router");
const gamesRouter = require("./video-games/vg-router");
const developersRouter = require("./developers/developers-router");

// *** [ Server Declaration ] *** //
const server = express();

// *** [ Middleware ] *** //
server.use(express.json());
server.use(cookieParser());
server.use(morgan("dev"));
server.use(helmet());
server.use(cors());
server.use(
  session({
    name: "David Viodes",
    secret: jwtSecret,
    saveUninitialized: false,
    resave: false,
    store: new Store({
      knex,
      createtable: true,
      clearInterval: 1000 * 60 * 10,
      tablename: "sessions",
      sidfieldname: "sid",
    }),
    cookie: {
      maxAge: 1000 * 60 * 30,
      secure: false,
      httpOnly: true,
    },
  })
);

// *** [ Routers ] *** //
server.use("/", indexRouter);
server.use("/auth", authRouter);
server.use("/api/users", userRouter);
server.use("/api/games", gamesRouter);
server.use("/api/developers", developersRouter);

// *** [ Error Handling ] *** //
server.use((err, req, res, next) => {
  if (err instanceof createError.HttpError) {
    res.locals.message = err.message;
    res.locals.status = err.statusCode;
    if (process.env.NODE_ENV === "development") {
      res.locals.error = err;
    }
  }
  console.log(err);
  if (process.env.NODE_ENV === "production" && !res.locals.message) {
    res.locals.message = "ApplicationError";
    res.locals.status = 500;
  }
  if (res.locals.status) {
    res.status(res.locals.status || 500);
    const errObject = { error: res.locals.error, message: res.locals.message };
    return res.json(errObject);
  }
  next(err);
});

// *** [ Exports ] *** //
module.exports = server;
