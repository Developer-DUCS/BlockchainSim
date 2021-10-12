const db = require("../../../dbConn");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const router = require("express").Router();

// Create a user
router.post("/register", cors(), (req, res) => {
  res.sendStatus(200);
  console.log("register entered");
  // initialize variables
  var email = req.body.email;
  var password = req.body.password;
  var role = req.body.role;
  //console.log("req.body: " + JSON.stringify(req.body));
  console.log("email: " + email);
  console.log("pass: " + password);
  console.log("role: " + role);
  // Query database for email
  db.query("SELECT email FROM user WHERE email = ?", [email], (err, result) => {
    // If error, log it to console
    if (err) {
      console.log(err);
    } else if (result.length == 0) {
      // Email is available so create an account
      // Hash the password
      bcrypt.hash(password, null, null, function (err, hash) {
        if (err) {
          console.log(err);
        } else {
          // Insert the email, hashed password, and role into the database
          db.query(
            "INSERT INTO user (email, password, role) VALUES (?,?,?)",
            [email, hash, role],
            (err, result) => {
              // If error, log it to console
              if (err) {
                console.log(err);
              } else {
                // User created
                console.log("user inserted");
                //res.status(201).end();
                return res.sendStatus(201);
              }
            }
          );
        }
      });
    } else {
      console.log("username is taken");
      // Conflict
      return res.sendStatus(409);
      // Error: An account with this email already exists.
    }
  });
});

module.exports = router;
