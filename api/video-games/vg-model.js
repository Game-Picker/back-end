// *** [ Imports ] *** //
const db = require("../../data/db-config");

// *** [ Exports ] *** //
module.exports = {
  find,
  findById,
  pickRandomGame,
  create,
  update,
  remove,
};

// *** [ Function To Get All Games From Games Table ] *** //
function find() {
  return db("games");
}

// *** [ Function To Get Specified Game From Games Table ] *** //
function findById(id) {
  return db("games").where({ id }).first();
}

// *** [ Function To Get Random Game From Games Table ] *** //
function pickRandomGame() {
  return db("games").orderByRaw("RANDOM()").limit(1);
}

// *** [ Function To Create A New Game In Games Table ] *** //
function create(game) {
  return db("games")
    .insert(game)
    .returning("id")
    .then((ids) => {
      const id = ids[0];
      return findById(id);
    });
}

// *** [ Function To Change An Exisiting Game In Games Table ] *** //
function update(id, changes) {
  return db("games")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

// *** [ Function To Remove An Exisiting Game From Games Table ] *** //
function remove(id) {
  return db("games").where({ id }).del();
}
