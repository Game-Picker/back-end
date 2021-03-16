const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  create,
  update,
  remove,
};

function find() {
  return db("developers");
}

function findById(id) {
  return db("developers").where({ id }).first();
}

function create(developer) {
  return db("developers")
    .insert(developer)
    .returning("id")
    .then((ids) => {
      const id = ids[0];
      return findById(id);
    });
}

function update(id, changes) {
  return db("developers")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function remove(id) {
  return db("developers").where({ id }).del();
}
