// Server side code for the application
// Note: Do we need to use bodyParser?

const express = require("express");
const app = express();
const port = 5000;

var router = express.Router();

// List of routes
app.use("/api/users", require("./client/src/api/users"));

app.use(router);
app.listen(port, () => `Server running on port ${port}`);
