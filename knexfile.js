// *** [ Imports ] *** //
const pg = require("pg");

// *** [ Local Database Connection Declarations ] *** //
const localConnection = "postgresql://localhost/video_game_db";
const localTestConnection = "postgresql://localhost/test_video_game_db";

let connection;

// *** [ If Statement To Declare Development & Production Database Connection ] *** //
if (process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false };
  connection = process.env.DATABASE_URL;
} else {
  connection = localConnection;
}

// *** [ Development Configuration ] *** //
const devConfig = {
  client: "pg",
  connection,
  migrations: { directory: "./data/migrations" },
  seeds: { directory: "./data/seeds" },
};

// *** [ Testing Configuration ] *** //
const testConfig = {
  client: "pg",
  connection: localTestConnection,
  migrations: { directory: "./data/migrations" },
  seeds: { directory: "./data/seeds" },
};

// *** [ Production Configuration ] *** //
const prodConfig = {
  client: "pg",
  connection,
  migrations: { directory: "./data/migrations" },
  seeds: { directory: "./data/seeds" },
};

// *** [ Exports ] *** //
module.exports = {
  development: { ...devConfig },
  testing: { ...testConfig },
  production: {
    ...prodConfig,
    pool: { min: 2, max: 10 },
  },
};
