exports.seed = function(knex) {
  return knex('games_consoles').truncate()
    .then(() => {
      return knex('games_consoles').insert([
        {
          game_id: 1,
          console_id: 21
        },
        {
          game_id: 1,
          console_id: 22
        },
        {
          game_id: 2,
          console_id: 22
        },
        {
          game_id: 2,
          console_id: 23
        }
      ])
    })
};
