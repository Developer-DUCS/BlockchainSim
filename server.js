// Server side code for the application
// Note: Do we need to use bodyParser?

const express = require("express");
const app = express();
const port = 5000;

var router = express.Router();

// List of routes
router.use("/api/customers", require("./client/src/api/customers"));

app.use(router);
app.listen(port, () => `Server running on port ${port}`);
