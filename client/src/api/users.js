const bodyParser = require("body-parser");
const router = require("express").Router();
//const jwt = require("jwt-simple");
//const bcrypt = require("bcryptjs");
const conn = require("../../../mysqldb");

router.use(bodyParser.json());

//const secret = "secret";

router.post("/login", (req, res) => {
  //check if email and password are sent
  if (!req.body.email || !req.body.password) {
    res.status(401).json({ error: "Missing username and/or password" });
    return;
  }
  console.log("enters route");
  // go into mysql and get info
  let qry = `select * from btb.users where email = "${req.body.email}"`;
  conn.query(qry, (err, rows) => {
    if (err) {
      console.log("big error");
      console.log(err);
      return res.status(500).json({ error: err });
    }
    // assert: no error - process the result set
    if (rows.length == 0) {
      // no users found
      res.status(400).json({ msg: "No users found" });
    } else {
      console.log("enters else statement");
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
      res.status(200).json({
        msg: "user authenticated",
        fname: users[0].fname,
        lname: users[0].lname,
        role: users[0].role,
        token: token,
      });
      /* console.log(users[0])
              if (users[0]) {
                // Does given password hash match the database password hash?
                if (bcrypt.compareSync(req.body.password, users[0].password)) {
                   // Send back a token that contains the user's username
                    const token = jwt.encode({email: req.body.email}, secret)
                    res.status(200).json({msg: 'user authenticated', 
                                          fname: users[0].fname, 
                                          lname: users[0].lname, 
                                          role: users[0].role,
                                          token: token});
                }
                else{
                    res.status(401).json({msg: 'user unauthorized'});
                }
            }
             else {
                 res.status(401).json({msg: 'user unauthorized'});
             };*/
    }
  });
});
module.exports = router;
