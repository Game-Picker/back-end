// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: "postgres://localhost/video_game_db",
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
    useNullAsDefault: true,
  },

  test: {
    client: "pg",
    connection: "postgres://localhost/video_game_db_test",
    migrations: {
      directory: "./data/migration",
    },
    seeds: {
      directory: "./data/seeds",
    },
    useNullAsDefault: true,
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./data/migration",
    },
    seeds: {
      directory: "./data/seeds",
    },
    useNullAsDefault: true,
  },
};
