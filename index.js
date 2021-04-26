// *** [ Environment Variable Setup ] *** //
require("dotenv").config();

// *** [ Server Import ] *** //
const server = require("./api/server");

// *** [ Port Declaration ] *** //
const PORT = process.env.PORT || 5000;

// *** [ Tell Server What Port To Listen To ] *** //
server.listen(PORT, () => {
  if (PORT === 5000) {
    console.log(`\n*** SET UP ENV is listening on port ${PORT}...\n`);
  } else {
    console.log(`\n*** Server is listening on port ${PORT} ***\n`);
  }
});
