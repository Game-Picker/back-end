// *** [ Imports ] *** //
const db = require("../data/db-config");

// *** [ Exports ] *** //
module.exports = {
  find,
  findBy,
  findById,
  insert,
  update,
  remove,
};

// *** [ Function To Get All Users From Users Table ] *** //
function find() {
  return db("users");
}

// *** [ Functions To Get Specified User From Users Table ] *** //
function findBy(email) {
  return db("users").where({ email }).orderBy("id");
}

function findById(id) {
  return db("users").where({ id }).first();
}

// *** [ Function To Create New User ] *** //
async function insert(user) {
  const [id] = await db("users").insert(user);
  return db("users").where({ id }).first();
}

// *** [ Function To Change An Exisiting User In Users Table ] *** //
async function update(id, changes) {
  const count = await db("users").where({ id }).update(changes);
  if (count) {
    return db("users").where({ id }).first();
  } else {
    return Promise.resolve(null);
  }
}

// *** [ Function To Remove An Exisiting User From Users Table ] *** //
async function remove(id) {
  const user = await db("users").where({ id }).first();
  if (!user) {
    return Promise.resolve(null);
  } else {
    await db("users").where({ id }).del();
    return Promise.resolve(user);
  }
}
