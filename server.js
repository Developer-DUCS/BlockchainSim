// Server side code for the application
// Note: Do we need to use bodyParser?

const express = require("express");
const app = express();
const router = express.Router();
require("dotenv").config();

app.use(express.static("public"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// List of routes
router.use("/api/users", require("./client/src/api/users"));
router.use("/api/data", require("./client/src/api/data"));

app.use(router);
app.listen(
  process.env.PORT,
  () => `Server running on port ${process.env.PORT}`
);
