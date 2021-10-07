const mysql = require("mysql");
//TODO: need to change config file to match our btb database
const config = require("./configuration/config.json");

var conn = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});
conn.connect(function (err) {
  if (err) {
    console.log("Error connecting to MySQL", err);
  } else {
    console.log("Connection established");
  }
});
module.exports = conn;
