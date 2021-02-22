require("dotenv").config();

const https = require("https");
const path = require("path");
const fs = require("fs");

const server = require("./api/server");

const PORT = process.env.PORT || 5000;

const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
  },
  server
);

sslServer.listen(PORT, () => {
  console.log(`\n*** Secure server is listening on port ${PORT} ***\n`);
});
