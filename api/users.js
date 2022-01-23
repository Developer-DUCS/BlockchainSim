const express = require("express");
const app = express();
const db = require("../dbConn");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const router = express.Router();
const jwt = require("jwt-simple");
const config = require("../configuration/config.json");

// to parse JSON
app.use(express.json());
router.post("/login", (req, res) => {
  //check if email and password are sent
  if (!req.body.email || !req.body.password) {
    res.status(401).json({ error: "Missing username and/or password" });
    return;
  }
  // go into mysql and get info
  let qry = `select * from user where email = "${req.body.email}"`;
  db.query(qry, (err, rows) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }
    // assert: no error - process the result set
    if (rows.length == 0) {
      // no users found
      res.status(400).json({ msg: "No users found" });
    } else {
      // process the user records
      let users = [];
      rows.forEach((row) => {
        let user = {
          uid: row.uid,
          email: row.email,
          role: row.role,
          dateCreated: row.created_date,
          password: row.password,
        };
        users.push(user);
      });
      if (users[0]) {
        // Does given password hash match the database password hash?
        bcrypt.compare(req.body.password, users[0].password, (err, result) => {
          // Send back a token that contains the user's username
          const token = jwt.encode({ email: req.body.email }, config.secret);
          if (result == true) {
            res.status(200).json({
              msg: "user authenticated",
              fname: users[0].fname,
              lname: users[0].lname,
              role: users[0].role,
              token: token,
            });
          } else {
            res.sendStatus(409);
          }
        });
      }
    }
  });
});

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
          // Create a table for the users blocks
          var tableName = "blocks_";
          const _id = id.replace(/[@.]/g, "_");
          tableName = tableName + _id;
          db.query(
            `CREATE TABLE ${tableName} (
              hash VARCHAR(64) NOT NULL,
              header JSON NOT NULL,
              transactions JSON NOT NULL,
              transaction_counter TINYINT NOT NULL, 
              miner VARCHAR(256) NOT NULL, 
              balances JSON NOT NULL,
              time_created TIMESTAMP NOT NULL, 
              PRIMARY KEY (hash));`,
            (err, result) => {
              // If error, log it to console
              if (err) {
                console.log(err);
              } else {
                // Log user created block table to console
                console.log(
                  "User " + id + " created a block table with name " + tableName
                );
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

router.post("/auth", cors(), (req, res) => {
  try {
    let user = jwt.decode(req.body.token, config.secret);
    res.status(200);
    db.destroy();
    res.send(user);
  } catch (err) {
    db.destroy();
    res.sendStatus(401);
  }
});

module.exports = router;
