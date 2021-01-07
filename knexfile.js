const pgConnection = `${process.env.DATABASE_URL}?sslmode=require`;

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
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
    useNullAsDefault: true,
  },

  production: {
    client: "pg",
    useNullAsDefault: true,
    connection: pgConnection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
};
