const express = require("express");
const app = express();
const router = express.Router();
const db = require("../../../dbConn");
const cors = require("cors");

app.use(express.json());

router.post("/", cors(), (req, res) => {
  //get email from form
  let email = req.body.email;
  let sim_id = req.body.sim_id;
  if (!email) {
    res.status(401).json({ error: "Missing username." });
    return;
  }

  //see if the database has that user
  let qry = `select * from user where email = "${email}"`;
  db.query(qry, (err, rows) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }
    //if not error
    if (rows.length == 0) {
      // no users found
      res.status(400).json({ msg: "No users found" });
    }

    //DUMB
    email = JSON.stringify({ email: email });

    // if so add the user's email to the simulation ID gathered in the simulation page
    let qryNew = `UPDATE simulation SET sim_shared = '${email}' WHERE sim_id = '${sim_id}';`;

    db.query(qryNew, (err) => {
      // If error, log it to console
      if (err) {
        console.log(err);
      } else {
        // User created
        res.sendStatus(201);
      }
    });
  });

  //hope that the new user can access the sim
});

module.exports = router;
