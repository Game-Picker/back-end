// *** [ Imports ] *** //
const knex = require("knex");

const config = require("../knexfile");

// *** [ Database Environment Configuration ] *** //
const dbEnv = "testing";

// *** [ Exports ] *** //
module.exports = knex(config[dbEnv]);
