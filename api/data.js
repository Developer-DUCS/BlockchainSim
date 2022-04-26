const express = require("express");
const app = express();
const router = express.Router();
const db = require("../dbConn");
const cors = require("cors");

const timeStamp = require("../js/blockchain/block/timeStamp");
const simulationCreator = require("../js/blockchain/simulation");
const { createMinerPool } = require("../js/blockchain/block/miningPool");
const sjcl = require("../js/sjcl");
const { createWallet } = require("../js/blockchain/wallet");
const createBlock = require("../js/blockchain/block/createBlock");
const { susInput, escApos } = require("../js/utils/clean_input");

app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

// Creating a Simulation
// This will add a new row to the simulation and blocks table
router.post("/createsim", cors(), (req, res) => {
  // Add in here
  const user = req.body.user;
  //var subsidy = int(req.body.subsidy);
  const initValues = {
    name: req.body.name,
    desc: req.body.desc,
    gendate: req.body.gendate,
    gentime: req.body.gentime,
    blockwin: req.body.blockwin,
    numblocks: req.body.numblocks,
    transactions: req.body.transactions,
    subsidy: parseInt(req.body.subsidy),
    halvings: req.body.halvings,
    coin: req.body.coin,
    mining: req.body.mining,
    numminers: req.body.numminers,
  };

  var miningPool = createMinerPool(initValues.numminers, user.email); //create mining pool
  var wallets = createWallet(miningPool); // <-- [wallet_id, owner, simulation_id, adresses_aviable, balance]

  var bithash = sjcl.hash.sha256.hash(initValues.desc);
  var initialHash = sjcl.codec.hex.fromBits(bithash);

  let initTime = [initValues.gendate, initValues.gentime];
  var timeStampArr = timeStamp(
    initTime,
    initValues.numblocks,
    initValues.blockwin
  );

  console.log("works up to here 1.0", initValues, initialHash, user.email);

  var simulation = simulationCreator(
    initValues.numblocks,
    initialHash,
    timeStampArr,
    miningPool,
    user.email,
    initValues.transactions,
    initValues.subsidy,
    initValues.halvings,
    wallets
  );

  console.log("works up to here 2.0");
  let data = {
    simulation: {
      user: user.email,
      sim_name: initValues.name,
      sim_shared: {},
      sim_description: initValues.desc,
      sim_created: new Date().toISOString().slice(0, 19).replace("T", " "),
      sim_modified: new Date().toISOString().slice(0, 19).replace("T", " "),
      sim_blocks: simulation[0],
      subsidy: initValues.subsidy,
      halvings: initValues.halvings,
      numtransactions: initValues.transactions,
      wallets: simulation[2], //change
      miningPool: miningPool,
      utxoPool: simulation[3], // change
      blockwin: 10,
    },
    blocks: simulation[1],
  };

  // End
  const email = data.simulation.user;
  const email_valid = email.replace(/[@.]/g, "_");
  let sim_name = data.simulation.sim_name;
  const sim_shared = data.simulation.sim_shared;
  let sim_description = data.simulation.sim_description;
  const sim_created = data.simulation.sim_created;
  const sim_modified = data.simulation.sim_modified;
  const sim_blocks = data.simulation.sim_blocks;
  const sim_shared_string = JSON.stringify(sim_shared);
  const sim_blocks_string = JSON.stringify(sim_blocks);
  const subsidy = data.simulation.subsidy;
  const halvings = data.simulation.halvings;
  const numtransactions = data.simulation.numtransactions;
  const sminingPool = JSON.stringify(data.simulation.miningPool);
  const utxoPool = JSON.stringify(data.simulation.utxoPool);
  const blockwin = data.simulation.blockwin;
  const walletsJSON = [];

  //Check for suspicious input in the name and description
  if (susInput(sim_name) == true) {
    // Send bad request
    res.sendStatus(400);
  }
  if (susInput(sim_description) == true) {
    // Send bad request
    res.sendStatus(400);
  }
  sim_name = escApos(sim_name);
  sim_description = escApos(sim_description);

  for (let i = 0; i < wallets.length; i++) {
    miner = wallets[i][1];

    walletsJSON.push({
      hash: wallets[i][0],
      owner: miner,
      simulation_id: wallets[i][2],
      addresses: wallets[i][3],
      balance: wallets[i][4],
      personal_ledger: wallets[i][5],
    });
  }
  const swallets = JSON.stringify(walletsJSON);

  console.log(wallets, utxoPool);

  console.log("simulation created, pending of being added to database");

  let qry = `INSERT INTO simulation (email,sim_name,sim_shared,sim_description,sim_created,sim_modified,sim_blocks,subsidy,halvings,numtransactions,wallets,miningPool,utxoPool,blockwin) VALUES ('${email}', '${sim_name}', '${sim_shared_string}', '${sim_description}', '${sim_created}', '${sim_modified}', '${sim_blocks_string}', '${subsidy}', '${halvings}', '${numtransactions}', '${swallets}', '${sminingPool}' , '${utxoPool}' , '${blockwin}' );`;
  db.query(qry, (err) => {
    if (err) {
      console.log(err);
    }
  });

  let qry2 = "";

  console.log("simulation added, left the blocks");

  for (let i = 0; i < data.blocks.length; i++) {
    const hash = data.blocks[i].id_block;
    const header = data.blocks[i].header;
    const headerString = JSON.stringify(header);
    const transaction = data.blocks[i].transaction;
    const transactionString = JSON.stringify(transaction);
    const transaction_counter = data.blocks[i].transaction_counter;
    const miner = data.blocks[i].miner;
    const block_time_created = data.blocks[i].time_created;

    if (i == 0) {
      qry2 += `INSERT INTO blocks_${email_valid} VALUES ('${hash}', '${headerString}', '${transactionString}', ${transaction_counter}, '${miner}', '${block_time_created}'),`;
    } else if (i == data.blocks.length - 1) {
      qry2 += `('${hash}', '${headerString}', '${transactionString}', ${transaction_counter}, '${miner}', '${block_time_created}');`;
    } else {
      qry2 += `('${hash}', '${headerString}', '${transactionString}', ${transaction_counter}, '${miner}', '${block_time_created}'),`;
    }
  }

  console.log("blocks added");

  db.query(qry2, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
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
    } else if (result.length == 0) {
      // Not authorized to delete the simulation (not the owner)
      res.sendStatus(403);
    } else {
      // Delete Simulation
      qry = `DELETE FROM simulation WHERE email='${email}' AND sim_id='${sim_id}'`;
      db.query(qry, (err) => {
        if (err) {
          console.log(err);
        } else {
          res.sendStatus(200);
        }
      });

      // Delete Blocks
      // for each element in the sim blocks json object
      let resultData = JSON.stringify(result).replace(/[:\\\{\}]/g, "");
      resultData = resultData.slice(14, resultData.length - 2);
      var hashes = JSON.parse(resultData);
      for (var id in hashes) {
        let hash = hashes[id];
        // delete hash from blocks table
        let qry = `DELETE FROM blocks_${email_valid} WHERE hash='${hash}'`;
        db.query(qry, (err) => {
          if (err) {
            console.log(err);
          } else {
          }
        });
      }
    }
  });
});

router.post("/getsimulations", cors(), (req, resp) => {
  var email = req.body.email;
  let qry = `SELECT sim_id, sim_name, sim_created, sim_modified, sim_shared, sim_description, sim_blocks FROM simulation WHERE email='${email}'`;
  db.query(qry, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      resp.status(200).send(res);
    }
  });
});

router.post("/getsimulations/id", cors(), (req, resp) => {
  var id = req.body.id;
  let qry = `SELECT * FROM simulation WHERE sim_id='${id}'`;
  db.query(qry, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      resp.status(200).send(res);
    }
  });
});

router.post("/getblocks", cors(), (req, resp) => {
  var blocks = JSON.parse(req.body.blocks);
  var owner = req.body.owner;
  let blockTable = "blocks_" + owner.replace(/[@.]/g, "_");

  let qry = ` SELECT * FROM ${blockTable} WHERE hash IN (`;

  blocks.map((hash, index) => {
    if (index == 0) {
      qry += `'${hash}'`;
    } else {
      qry += `,'${hash}'`;
    }
  });

  qry += ") ORDER BY time_created ASC;";

  db.query(qry, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      resp.status(200).send(res);
    }
  });
});

router.post("/getsharedsimulations", cors(), (req, resp) => {
  var email = req.body.email;
  let qry = `SELECT sim_id, sim_name, sim_created, sim_modified, sim_shared, sim_description, sim_blocks from simulation WHERE JSON_VALUE(sim_shared, '$.email') LIKE '%${email}%'`;
  db.query(qry, (err, res) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } else {
      resp.status(200).send(res);
    }
  });
});

// Return information from the latest block in simulation to create new block
router.post("/addnewblock", cors(), (req, resp) => {
  var sim_id = req.body.sim_id;
  var email = req.body.email;
  let email_valid = email.replace(/[@.]/g, "_");
  // TODO : Add numMiners and blockWindow to database
  // Initialize variables
  let subsidy;
  let halvings;
  let previousHash;
  let num_transactions;
  let block_height;
  let timeStamp;
  var miningPool;
  let wallets;
  let utxoPool;
  let totalCoin = 0;
  // get subsidy halvings blocks
  let qry = `SELECT subsidy, halvings, sim_blocks, numtransactions, miningPool, wallets, blockwin, utxoPool FROM simulation WHERE sim_id = '${sim_id}'`;
  db.query(qry, (err, res) => {
    if (err) {
      console.log(err);
      resp.status(400);
    } else {
      subsidy = res[0].subsidy;
      halvings = res[0].halvings;
      let sim_blocks = JSON.parse(res[0].sim_blocks);
      previousHash = sim_blocks[sim_blocks.length - 1];
      num_transactions = res[0].numtransactions;
      block_height = sim_blocks.length;
      miningPool = res[0].miningPool;
      wallets = res[0].wallets;
      let blockwin = res[0].blockwin;
      utxoPool = res[0].utxoPool;

      // get timestamp
      let qry = `SELECT time_created FROM blocks_${email_valid} WHERE hash = '${previousHash}'`;
      db.query(qry, (err, re) => {
        if (err) {
          console.log(err);
          resp.sendStatus(400);
        } else {
          // Time stamp holds a value here, when its received, it is undefined.
          console.log("re time", re[0].time_created);
          timeStamp = new Date(re[0].time_created);
          timeStamp.setMinutes(timeStamp.getMinutes() + blockwin);
          timeStamp.setHours(timeStamp.getHours() - 6);
          timeStamp = timeStamp.toISOString().slice(0, 19).replace("T", " "); // transform to ISO format

          let newBlock = createBlock(
            previousHash,
            timeStamp,
            num_transactions,
            block_height,
            subsidy,
            halvings,
            miningPool,
            wallets,
            utxoPool,
            totalCoin
          );
          let hash = newBlock[1];
          let block = newBlock[0];
          let headerString = JSON.stringify(block.header);
          let transactionString = JSON.stringify(block.transaction);
          let transaction_counter = block.transaction_counter;
          let miner = block.miner;
          let block_time_created = block.time_created;
          qry = `SELECT sim_blocks FROM simulation WHERE sim_id = '${sim_id}'`;
          // Insert the new block hash into the simulation table's sim_blocks
          // Get blocks
          db.query(qry, (err, res) => {
            if (err) {
              console.log(err);
              resp.status(400);
            } else {
              // Push hash
              let resultData = JSON.stringify(res).replace(/[:\\\{\}]/g, "");
              resultData = resultData.slice(14, resultData.length - 2);
              var hashes = JSON.parse(resultData);
              hashString = "[";
              for (var id in hashes) {
                let hash = hashes[id];
                hashString += ` "${hash}" ,`;
              }
              hashString += ` "${hash}" ]`;
              let qr = `UPDATE simulation SET sim_blocks = '${hashString}' WHERE sim_id = '${sim_id}'`;
              // Update sim_blocks to contain hash
              db.query(qr, (err, re) => {
                if (err) {
                  console.log(err);
                  resp.status(400);
                } else {
                  // I hardcoded a date into this query, so it would go through
                  console.log("btm", block_time_created);
                  console.log("timestamp", timeStamp);
                  let q = `INSERT INTO blocks_${email_valid} VALUES ('${hash}', '${headerString}', '${transactionString}', ${transaction_counter}, '${miner}', '${block_time_created}')`;
                  db.query(q, (err, r) => {
                    if (err) {
                      console.log(err);
                      resp.status(400);
                    } else {
                      // Insert the new block into the blocks_user table
                      resp.sendStatus(200);
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
});

router.post("/getwallets/id", cors(), (req, resp) => {
  var id = req.body.id;
  let qry = `SELECT wallets FROM simulation WHERE sim_id='${id}'`;
  db.query(qry, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      resp.status(200).send(JSON.parse(res[0].wallets));
    }
  });
});

router.post("/getminertransaction/miner", cors(), (req, resp) => {
  var miner = req.body.miner;
  var email = req.body.email;
  let email_valid = email.replace(/[@.]/g, "_");

  // owner = miner
  //let hash = 00; //select id from wallet row in simulation of owner
  let qry = `SELECT transactions FROM blocks_${email_valid} WHERE sender_wallet=${hash} OR receiver_wallet=${hash};`;

  db.query(qry, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      //have to go through every element and turn them into a json object
      for (let i = 0; i < res.length; i++) {
        res[i] = JSON.parse(res[i].transactions);
      }
      resp.status(200).send(res);
    }
  });
});

module.exports = router;
