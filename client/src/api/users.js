const express = require("express");
const app = express();
const db = require("../../../dbConn");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const router = express.Router();

// to parse JSON
app.use(express.json());

// Create a user
router.post("/register", cors(), (req, res) => {
  // initialize variables
  var id = req.body.id;
  var pass = req.body.pass;
  var role = req.body.role;
  // Query database for email
  db.query("SELECT email FROM user WHERE email = ?", [id], (err, result) => {
    // If error, log it to console
    if (err) {
      console.log(err);
    } else if (result.length == 0) {
      // Email is available so create an account
      // Hash the password
      bcrypt.hash(pass, null, null, function (err, hash) {
        if (err) {
          console.log(err);
        } else {
          // Insert the email, hashed password, and role into the database
          db.query(
            "INSERT INTO user (email, password, role) VALUES (?,?,?)",
            [id, hash, role],
            (err, result) => {
              // If error, log it to console
              if (err) {
                console.log(err);
              } else {
                // User created
                res.sendStatus(201);
              }
            }
          );
        }
      });
    } else {
      // Conflict: invalid email.
      return res.sendStatus(409);
    }
  });
});

module.exports = router;
