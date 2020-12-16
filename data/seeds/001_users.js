const bcrypt = require("bcryptjs");

exports.seed = function (knex) {
  return knex("users")
    .truncate()
    .then(() => {
      return knex("users").insert([
        {
          first_name: "David",
          last_name: "Viodes",
          email: "djviodes26@gmail.com",
          password: bcrypt.hashSync("^g7B84rY*v16%lHn", 14),
        },
        {
          first_name: "Jonah",
          last_name: "Salazar",
          email: "jonahsalazar1996@gmail.com",
          password: bcrypt.hashSync("DunderMifflin098?", 14),
        },
      ]);
    });
};
