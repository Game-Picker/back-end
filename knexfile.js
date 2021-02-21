const pg = require("pg");

const localConnection = "postgresql://localhost/video_game_db";

let connection;

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false };
  connection = process.env.DATABASE_URL;
} else {
  connection = localConnection;
}

const devConfig = {
  client: "pg",
  connection: "postgresql://localhost/video_game_db",
  migrations: { directory: "./data/migrations" },
  seeds: { directory: "./data/seeds" },
};

const prodConfig = {
  client: "pg",
  connection,
  migrations: { directory: "./data/migrations" },
  seeds: { directory: "./data/seeds" },
};

module.exports = {
  development: { ...devConfig },
  production: {
    ...prodConfig,
    pool: { min: 2, max: 10 },
  },
};
