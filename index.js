// *** [ Environment Variable Setup ] *** //
require("dotenv").config();

// *** [ Imports ] *** //
const https = require("https");
const path = require("path");
const fs = require("fs");

// *** [ Server Import ] *** //
const server = require("./api/server");

// *** [ Port Declaration ] *** //
const PORT = process.env.PORT || 5000;

// *** [ Secure Server Declaration ] *** //
const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
  },
  server
);

// *** [ Tell Server What Port To Listen To ] *** //
sslServer.listen(PORT, () => {
  console.log(`\n*** Secure server is listening on port ${PORT} ***\n`);
});
