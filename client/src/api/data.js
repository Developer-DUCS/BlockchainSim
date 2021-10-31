const express = require("express");
const router = express.Router();
const db = require("../../../dbConn");
const cors = require("cors");

router.post("/block", cors(), (req, res) => {
  console.log("block route entered");
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
    1: "transaction_one",
    2: "transaction_two",
    3: "transaction_three",
    4: "transaction_four",
    5: "transaction_five",
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

router.post("/simulation", cors(), (req, res) => {
  const sim_id = 1;
  const email = "seth@workman.com";
  const sim_name = "My First Blockchain";
  const sim_shared = {
    emails: ["sean@lowry.com", "bryan@valencia.com"],
  };
  const sim_description = "The first blockchain simulation I ever created!";
  const sim_created = new Date().toISOString().slice(0, 19).replace("T", " ");
  const sim_modified = new Date().toISOString().slice(0, 19).replace("T", " ");
  const sim_blocks = {
    1: "0104db27ef0e770ea5b0786880ee0883b13b04eeb7c34acebc77c4e47957ae95",
    2: "081d730172ca30cd21eaf9f2c6eb41d70b6ff64910b6ce959a0505be0ba729de",
    3: "076b23542004b61dea24d6ceef487ee81fcf7ecde0ce0a726e07550c6e6a39f4",
    4: "014ae7f504e6ac8439ad29f8bdafcfed4ec3d74364dbb0ffdc8df8827861439f",
    5: "00452e6e3a9450d6a8366a12db71c771a42ce6e93bf85912ac51d4434e721add",
  };
  const sim_shared_string = JSON.stringify(sim_shared);
  const sim_blocks_string = JSON.stringify(sim_blocks);
  let qry = `INSERT INTO simulation (email,sim_name,sim_shared,sim_description,sim_created,sim_modified,sim_blocks) VALUES ('${email}', '${sim_name}', '${sim_shared_string}', '${sim_description}', '${sim_created}', '${sim_modified}', '${sim_blocks_string}');`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(201);
    }
  });
});

module.exports = router;
