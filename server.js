// Server side code for the application
// Note: Do we need to use bodyParser?

const express = require("express");
const app = express();
const port = 5000;
const router = express.Router();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// List of routes
router.use("/api/users", require("./client/src/api/users"));

app.use(router);
app.listen(port, () => `Server running on port ${port}`);
