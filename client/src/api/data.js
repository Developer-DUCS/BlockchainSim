const express = require("express");
const app = express();
const router = express.Router();
const db = require("../../../dbConn");
const cors = require("cors");
const { hash } = require("bcrypt-nodejs");

app.use(express.json());

app.use(express.json());

router.post("/block", cors(), (req, res) => {
  const hash =
    "0104db27ef0e770ea5b0786880ee0883b13b04eeb7c34acebc77c4e47957ae95";
  const header = {
    version: "00000020",
    previousHash:
      "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
    merkleTree:
      "113459eb7bb31bddee85ade5230d6ad5d8b2fb52879e00a84ff6ae1067a210d3",
    target: "00000000",
    nonce: "16c4c4b0",
  };
  const transactions = {
    0: "none yet",
  };
  const headerString = JSON.stringify(header);
  const transactionsString = JSON.stringify(transactions);
  const transaction_counter = 5;
  const miner = "whodidit";
  const time_created = new Date().toISOString().slice(0, 19).replace("T", " ");
  let qry = `INSERT INTO blocks_seth_workman_com VALUES ('${hash}', '${headerString}', '${transactionsString}', ${transaction_counter}, '${miner}', '${time_created}');`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(201);
    }
  });
});

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
  db.query(qry, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Sim inserted.");
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
    db.query(qry, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Block " + i + " inserted.");
      }
    });
  }
});

router.post("/deletesim", cors(), (req, res) => {
  const email = req.body.email;
  const sim_name = req.body.sim_name;
  // parse email where special characters = _
  const email_valid = email.replace(/[@.]/g, "_");
  let qry = `SELECT sim_blocks FROM simulation WHERE email='${email}' AND sim_name='${sim_name}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // for each element in the sim blocks json object
      resultData = JSON.stringify(result).replace(/[\\\[\]]/g, "");
      resultData = resultData.slice(15, resultData.length - 2);
      console.log(resultData);
      var hashes = JSON.parse(resultData);
      for (var id in hashes) {
        let hash = hashes[id];
        // delete hash from blocks table
        let qry = `DELETE FROM blocks_${email_valid} WHERE hash='${hash}'`;
        db.query(qry, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("block deleted");
          }
        });
      }
    }
  });
  let qry = `DELETE FROM simulation WHERE email='${email}' AND sim_name='${sim_name}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
