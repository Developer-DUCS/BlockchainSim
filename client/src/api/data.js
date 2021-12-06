const express = require("express");
const app = express();
const router = express.Router();
const db = require("../../../dbConn");
const cors = require("cors");

app.use(express.json());

router.post("/createsim", cors(), (req, res) => {
  const email = req.body.simulation.user;
  const email_valid = email.replace(/[@.]/g, "_");
  const sim_name = req.body.simulation.sim_name;
  const sim_shared = req.body.simulation.sim_shared;
  const sim_description = req.body.simulation.sim_description;
  const sim_created = req.body.simulation.sim_created
    .slice(0, 19)
    .replace("T", " ");
  const sim_modified = req.body.simulation.sim_modified
    .slice(0, 19)
    .replace("T", " ");
  const sim_blocks = req.body.simulation.sim_blocks;
  const sim_shared_string = JSON.stringify(sim_shared);
  const sim_blocks_string = JSON.stringify(sim_blocks);
  let qry = `INSERT INTO simulation (email,sim_name,sim_shared,sim_description,sim_created,sim_modified,sim_blocks) VALUES ('${email}', '${sim_name}', '${sim_shared_string}', '${sim_description}', '${sim_created}', '${sim_modified}', '${sim_blocks_string}');`;
  db.query(qry, (err) => {
    if (err) {
      console.log(err);
    }
  });
  for (i = 0; i < req.body.blocks.length; i++) {
    const hash = req.body.blocks[i].id_block;
    const header = req.body.blocks[i].header;
    const headerString = JSON.stringify(header);
    const transaction = req.body.blocks[i].transaction;
    const transactionString = JSON.stringify(transaction);
    const transaction_counter = req.body.blocks[i].transaction_counter;
    const miner = req.body.blocks[i].miner;
    const block_time_created = req.body.blocks[i].time_created;
    let qry = `INSERT INTO blocks_${email_valid} VALUES ('${hash}', '${headerString}', '${transactionString}', ${transaction_counter}, '${miner}', '${block_time_created}');`;
    db.query(qry, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
  res.sendStatus(200);
});

router.post("/deletesim", cors(), (req, res) => {
  const email = req.body.email;
  const sim_id = req.body.sim_id;

  // parse email where special characters = _
  const email_valid = email.replace(/[@.]/g, "_");
  let qry = `SELECT sim_blocks FROM simulation WHERE email='${email}' AND sim_id='${sim_id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // for each element in the sim blocks json object
      resultData = JSON.stringify(result).replace(/[:\\\{\}]/g, "");
      resultData = resultData.slice(14, resultData.length - 2);
      var hashes = JSON.parse(resultData);
      for (var id in hashes) {
        let hash = hashes[id];
        // delete hash from blocks table
        let qry = `DELETE FROM blocks_${email_valid} WHERE hash='${hash}'`;
        db.query(qry, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    }
  });

  qry = `DELETE FROM simulation WHERE email='${email}' AND sim_id='${sim_id}'`;
  db.query(qry, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(200);
    }
  });
});

router.post("/getsimulations", cors(), (req, resp) => {
  var email = req.body.email;
  let qry = `SELECT sim_id, sim_name, sim_created, sim_modified FROM simulation WHERE email='${email}'`;
  db.query(qry, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      resp.send(res);
    }
  });
});

router.post("/getsharedsimulations", cors(), (req, resp) => {
  var email = req.body.email;
  let qry = `SELECT sim_id, sim_name, sim_created, sim_modified from simulation WHERE JSON_VALUE(sim_shared, '$.email') LIKE '%${email}%'`;
  console.log(qry);
  db.query(qry, (err, res) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } else {
      resp.send(res);
    }
  });
});

/* router.post("/getsimulation", cors(), (req, res) => {
  var sim_name = req.body.sim_name;
  var email = req.body.email;
  let qry = SELECT sim_name, 
}); */

module.exports = router;
