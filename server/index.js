/*
 * Init variables/requires
 */
const express = require("express");
const logger = require("morgan");
const cors = require("cors")
const { SERVER_PORT } = require('./app/config/env.config');

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
app.use(cors({
  origin: '*'
}))

/*
 * Default route
 */
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

/*
 * Import routes
 */
require('./app/routes/auth.routes.js')(app)
require('./app/routes/board.routes.js')(app)
require('./app/routes/column.routes.js')(app)
require('./app/routes/task.routes.js')(app)

/*
 * Set server port
 */
app.listen(SERVER_PORT, () => {
  console.log(`server running on ${SERVER_PORT}`);
});
