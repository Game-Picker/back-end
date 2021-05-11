exports.seed = function(knex) {
  return knex('games_genres').truncate()
    .then(() => {
      return knex('games_genres').insert([
        {
          game_id: 1,
          genre_id: 10
        },
        {
          game_id: 1,
          genre_id: 11
        },
        {
          game_id: 2,
          genre_id: 10
        },
        {
          game_id: 2,
          genre_id: 11
        }
      ])
    })
};
