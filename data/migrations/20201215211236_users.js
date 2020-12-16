exports.up = function (knex) {
  let createQuery = `CREATE TABLE users(
      id BIGSERIAL PRIMARY KEY NOT NULL,
      first_name VARCHAR(128) NOT NULL,
      last_name VARCHAR(128) NOT NULL,
      email VARCHAR(256) NOT NULL,
      password VARCHAR(128) NOT NULL
  )`;
  return knex.raw(createQuery);
};

exports.down = function (knex) {
  let dropQuery = `DROP TABLE users`;
  return knex.raw(dropQuery);
};
