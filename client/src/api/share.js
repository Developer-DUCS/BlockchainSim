const express = require("express");
const app = express();
const router = express.Router();
const db = require("../../../dbConn");
const cors = require("cors");

app.use(express.json());

router.post("/", cors(), (req, res) => {
  //get email from form
  //see if the database has that user
  // if so add the user's email to the simulation ID gathered in the simulation page
  //if not error
  //hope that the new user can access the sim
});
