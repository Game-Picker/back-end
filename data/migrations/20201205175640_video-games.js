exports.up = function(knex) {
    return knex.schema
        .createTable('games', table => {
            table.increments()
            table.string('title', 128).notNullable().unique()
            table.string('image').notNullable()
            table.int('rating_id').notNullable()
            table.int('developer_id')
            table.string('price')
            table.string('link')
        })
        .createTable('consoles', table => {
            table.increments()
            table.string('name_of_console').notNullable()
        })
        .createTable('genres', table => {
            table.increments()
            table.string('genre').notNullable()
        })
        .createTable('ratings', table => {
            table.increments()
            table.string('rating').notNullable()
        })
        .createTable('developers', table => {
            table.increments()
            table.string('name_of_company').notNullable()
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('developers')
        .dropTableIfExists('ratings')
        .dropTableIfExists('genres')
        .dropTableIfExists('consoles')
        .dropTableIfExists('games')
};
