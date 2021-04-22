// *** [ Imports ] *** //
const knex = require("knex");

const config = require("../knexfile");

// *** [ Database Environment Configuration ] *** //
const dbEnv = process.env.DB_ENV || "development";

// *** [ Exports ] *** //
module.exports = knex(config[dbEnv]);
