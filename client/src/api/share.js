const express = require("express");
const app = express();
const router = express.Router();
const db = require("../../../dbConn");
const cors = require("cors");

app.use(express.json());

router.post("/", cors(), (req, res) => {
  //get email from form
  const email = req.body.email;
  //see if the database has that user
  let qry = `select * from user where email = "${email}"`;
  db.query(qry, (err, rows) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }
    if (rows.length == 0) {
      //user does not exist
      return res.sendStatus(404);
    } else {
      //user does exist
      //allow the shared user to view the simulation
      return res.status;
    }
  });
  // if so add the user's email to the simulation ID gathered in the simulation page
  //if not error
  //hope that the new user can access the sim
});
