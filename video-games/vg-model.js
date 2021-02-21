const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  pickRandomGame,
  create,
  update,
  remove,
};

function find() {
  return db("games");
}

function findById(id) {
  return db("games").where({ id }).first();
}

function pickRandomGame() {
  return db("games").orderByRaw("RANDOM()").limit(1);
}

function create(game) {
  return db("games")
    .insert(game)
    .returning("id")
    .then((ids) => {
      const id = ids[0];
      return findById(id);
    });
}

function update(id, changes) {
  return db("games")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function remove(id) {
  return db("games").where({ id }).del();
}
