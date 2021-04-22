// *** [ Function To Autopopulate Ratings Into Ratings table ] *** //
exports.seed = function (knex) {
  return knex("ratings").then(() => {
    return knex("ratings").insert([
      { rating: "E" },
      { rating: "E 10+" },
      { rating: "T" },
      { rating: "M" },
      { rating: "Ao" },
      { rating: "RP" },
    ]);
  });
};
