exports.up = function (knex) {
  return knex.schema
    .createTable("games", (table) => {
      table.increments();
      table.varchar("title", 128).notNullable().unique();
      table.varchar("image").notNullable();
      table.integer("rating_id").notNullable();
      table.integer("developer_id");
      table.varchar("price");
      table.varchar("link");
    })
    .createTable("consoles", (table) => {
      table.increments();
      table.varchar("name_of_console").notNullable();
    })
    .createTable("games_consoles", (table) => {
      table.integer("game_id").references("id").inTable("games");
      table.integer("console_id").references("id").inTable("consoles");
      table.primary(["game_id", "console_id"]);
    })
    .createTable("genres", (table) => {
      table.increments();
      table.varchar("genre").notNullable();
    })
    .createTable("games_genres", (table) => {
      table.integer("game_id").references("id").inTable("games");
      table.integer("genre_id").references("id").inTable("genres");
      table.primary(["game_id", "genre_id"]);
    })
    .createTable("ratings", (table) => {
      table.increments();
      table.varchar("rating").notNullable();
    })
    .createTable("developers", (table) => {
      table.increments();
      table.varchar("name_of_company").notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("developers")
    .dropTableIfExists("ratings")
    .dropTableIfExists("games_genres")
    .dropTableIfExists("genres")
    .dropTableIfExists("games_consoles")
    .dropTableIfExists("consoles")
    .dropTableIfExists("games");
};
