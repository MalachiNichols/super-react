/*
 * Init variables/requires
 */
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const https = require("https");
const http = require("http");
const fs = require("fs");
const { SERVER_PORT } = require("./app/config/env.config");

/**
 * Init SSL creds
 */
const options = {
  key: fs.readFileSync(`${CERT_PATH}.privkey.pem`),
  cert: fs.readFileSync(`${CERT_PATH}.fullchain.pem`),
};

/*
 * Init server and logger
 */
const app = express();
app.use(logger("dev"));

/*
 * Body-parser
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors()
);

/*
 * Default route
 */
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

/*
 * Import routes
 */
require("./app/routes/auth.routes.js")(app);
require("./app/routes/board.routes.js")(app);
require("./app/routes/column.routes.js")(app);
require("./app/routes/task.routes.js")(app);

/*
 * Set server port
 */
http
  .createServer(app)
  .listen(8080, () => console.log("http server running on 8080"));
https
  .createServer(options, app)
  .listen(8081, () => console.log("https server running on 8081"));
