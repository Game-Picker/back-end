// *** [ Function To Create Users Table ] *** //
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments();
    table.varchar("first_name", 128).notNullable();
    table.varchar("last_name", 128).notNullable();
    table.varchar("email", 128).notNullable().unique();
    table.varchar("password", 128).notNullable();
    table.bool("admin").notNullable();
  });
};

// *** [ Function To Delete Users Table ] *** //
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
