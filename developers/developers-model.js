// *** [ Imports ] *** //
const db = require("../data/db-config");

// *** [ Exports ] *** //
module.exports = {
  find,
  findById,
  create,
  update,
  remove,
};

// *** [ Function To Get All Developers From Developers Table ] *** //
function find() {
  return db("developers");
}

// *** [ Function To Get Specified Developer From Developers Table ] *** //
function findById(id) {
  return db("developers").where({ id }).first();
}

// *** [ Function To Create A New Developer In Developers Table ] *** //
function create(developer) {
  return db("developers")
    .insert(developer)
    .returning("id")
    .then((ids) => {
      const id = ids[0];
      return findById(id);
    });
}

// *** [ Function To Change An Exisiting Developer In Developers Table ] *** //
function update(id, changes) {
  return db("developers")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

// *** [ Function To Remove An Exisiting Developer From Developers Table ] *** //
function remove(id) {
  return db("developers").where({ id }).del();
}
