exports.seed = function(knex) {
  return knex('ratings').truncate()
    .then(() => {
      return knex('ratings').insert([
        { rating: 'E' },
        { rating: 'E 10+' },
        { rating: 'T' },
        { rating: 'M' },
        { rating: 'Ao' },
        { rating: 'RP' }
      ])
    })
};
