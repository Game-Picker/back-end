exports.seed = function(knex) {
  return knex('developers').truncate()
    .then(() => {
      return knex('developers').insert([
        { name_of_company: 'Naughty Dog' }
      ])
    })
};
