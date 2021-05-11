const db = require("../data/db-config");

module.exports = {
  find,
  findById,
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

async function create(game) {
  const [id] = await db("games").insert(game);
  return db("games").where({ id }).first();
}

async function update(id, changes) {
  const count = await db("games").where({ id }).update(changes);
  if (count) {
    return db("games").where({ id }).first();
  } else {
    return Promise.resolve(null);
  }
}

async function remove(id) {
  const user = await db("games").where({ id }).first();
  if (!user) {
    return Promise.resolve(null);
  } else {
    await db("games").where({ id }).del();
    return Promise.resolve(user);
  }
}
