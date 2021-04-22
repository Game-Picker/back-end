// *** [ Function To Autopopulate Developers Into Developers Table ] *** //
exports.seed = function (knex) {
  return knex("developers").then(() => {
    return knex("developers").insert([
      { name_of_company: "Naughty Dog" },
      { name_of_company: "From Software" },
    ]);
  });
};
