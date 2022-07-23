const mysql = require("mysql");

const db = mysql.createConnection({
  user: "btb",
  host: "127.0.0.1",
  password: "3Computers1hand",
  database: "btb"
});

db.connect(function (err) {
  if (err) {
    console.log("Error connecting to MySQL", err);
  } else {
    console.log("Connection established");
  }
});

module.exports = db;
