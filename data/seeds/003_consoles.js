// *** [ Function To Autopopulate Consoles Into Consoles Table ] *** //
exports.seed = function (knex) {
  return knex("consoles").then(() => {
    return knex("consoles").insert([
      { name_of_console: "NES" },
      { name_of_console: "Super NES" },
      { name_of_console: "Nintendo 64" },
      { name_of_console: "Nintendo GameCube" },
      { name_of_console: "Wii" },
      { name_of_console: "Wii U" },
      { name_of_console: "Nintendo Switch" },
      { name_of_console: "Game Boy" },
      { name_of_console: "Game Boy Pocket" },
      { name_of_console: "Game Boy Light" },
      { name_of_console: "Game Boy Color" },
      { name_of_console: "Game Boy Advance" },
      { name_of_console: "Game Boy Advance SP" },
      { name_of_console: "Nintendo DS" },
      { name_of_console: "Nintendo DS Lite" },
      { name_of_console: "Nintendo DSi" },
      { name_of_console: "Nintendo 3DS" },
      { name_of_console: "PlayStation" },
      { name_of_console: "PSone" },
      { name_of_console: "PlayStation 2" },
      { name_of_console: "PlayStation 3" },
      { name_of_console: "PlayStation 4" },
      { name_of_console: "PlayStation 5" },
      { name_of_console: "Xbox" },
      { name_of_console: "Xbox 360" },
      { name_of_console: "Xbox One" },
      { name_of_console: "Xbox Series X" },
      { name_of_console: "PC" },
    ]);
  });
};
