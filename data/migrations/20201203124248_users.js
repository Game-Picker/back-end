exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments()
        table.string('first_name', 128).notNullable()
        table.string('last_name', 128).notNullable()
        table.string('email', 128).notNullable().unique()
        table.string('password', 128).notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
