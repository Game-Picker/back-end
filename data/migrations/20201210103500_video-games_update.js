exports.up = function(knex) {
    return knex.schema
        .createTable('games_consoles', table => {
            table.integer('game_id')
                .references('id')
                .inTable('games')
            table.integer('console_id')
                .references('id')
                .inTable('consoles')
            table.primary(['game_id', 'console_id'])
        })
        .createTable('games_genres', table => {
            table.integer('game_id')
                .references('id')
                .inTable('games')
            table.integer('genre_id')
                .references('id')
                .inTable('genres')
            table.primary(['game_id', 'genre_id'])
        })
};

exports.down = function(knex) {
    return knex.schema 
        .dropTableIfExists('games_genres')
        .dropTableIfExists('games_consoles')
};
