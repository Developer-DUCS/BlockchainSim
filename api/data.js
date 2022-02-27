const express = require("express");
const app = express();
const router = express.Router();
const db = require("../dbConn");
const cors = require("cors");

const timeStamp = require("../client/src/js/blockchain/block/timeStamp");
const simulationCreator = require("../client/src/js/blockchain/simulation");
const {
  createMinerPool,
} = require("../client/src/js/blockchain/block/miningPool");
const sjcl = require("../client/src/sjcl");
const { createWallet } = require("../client/src/js/blockchain/wallet");

app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

// Creating a Simulation
// This will add a new row to the simulation and blocks table
router.post("/createsim", cors(), (req, res) => {
  // Add in here
  console.log(req.body);
  const user = req.body.user;
  const initValues = {
    name: req.body.name,
    desc: req.body.desc,
    gendate: req.body.gendate,
    gentime: req.body.gentime,
    blockwin: req.body.blockwin,
    numblocks: req.body.numblocks,
    transactions: req.body.transactions,
    subsidy: req.body.subsidy,
    halvings: req.body.halvings,
    coin: req.body.coin,
    mining: req.body.mining,
    numminers: req.body.numminers,
  };

  console.log(initValues, user);

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
  var simulation = simulationCreator(
    initValues.numblocks,
    initialHash,
    timeStampArr,
    miningPool,
    user.email,
    initValues.transactions,
    initValues.subsidy,
    initValues.halvings
  ); // <-- [hashes, blocks]

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
    },
    blocks: simulation[1],
  };

  // End

  const email = data.simulation.user;
  const email_valid = email.replace(/[@.]/g, "_");
  const sim_name = data.simulation.sim_name;
  const sim_shared = data.simulation.sim_shared;
  const sim_description = data.simulation.sim_description;
  const sim_created = data.simulation.sim_created;
  const sim_modified = data.simulation.sim_modified;
  const sim_blocks = data.simulation.sim_blocks;
  const sim_shared_string = JSON.stringify(sim_shared);
  const sim_blocks_string = JSON.stringify(sim_blocks);
  const subsidy = data.simulation.subsidy;
  const halvings = data.simulation.halvings;
  const numtransactions = data.simulation.numtransactions;
  const walletsJSON = [];

  for (let i = 0; i < wallets.length; i++) {
    miner = wallets[i][1];

    walletsJSON.push({
      hash: wallets[i][0],
      owner: miner,
      simulation_id: wallets[i][2],
      addresses: wallets[i][3],
      balance: wallets[i][4],
    });
  }
  const wallets_string = JSON.stringify(walletsJSON);
  // Go through each miner's wallet
  // Get their addresses
  // Look up transactions based upon that miner
  // See how much they have recieved

  let qry = `INSERT INTO simulation (email,sim_name,sim_shared,sim_description,sim_created,sim_modified,sim_blocks,subsidy,halvings,numtransactions,wallets) VALUES ('${email}', '${sim_name}', '${sim_shared_string}', '${sim_description}', '${sim_created}', '${sim_modified}', '${sim_blocks_string}', '${subsidy}', '${halvings}', '${numtransactions}', '${wallets_string}');`;
  db.query(qry, (err) => {
    if (err) {
      console.log(err);
    }
  });

  let qry2 = "";

  console.log("Length", data.blocks.length);
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
      qry2 += `INSERT INTO blocks_${email_valid} VALUES ('${hash}', '${headerString}', '${transactionString}', ${transaction_counter}, '${miner}', '{}', '${block_time_created}'),`;
    } else if (i == data.blocks.length - 1) {
      qry2 += `('${hash}', '${headerString}', '${transactionString}', ${transaction_counter}, '${miner}', '{}', '${block_time_created}');`;
    } else {
      qry2 += `('${hash}', '${headerString}', '${transactionString}', ${transaction_counter}, '${miner}', '{}', '${block_time_created}'),`;
    }
  }

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
  let result = [];
  db.query(qry, (err, result) => {
    if (err) {
      console.log(err);
    } else if (result.length == 0) {
      res.sendStatus(403);
    } else {
      result = result;
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
          }
        });
      }
    }
  });

  if (result.length > 0) {
    qry = `DELETE FROM simulation WHERE email='${email}' AND sim_id='${sim_id}'`;
    db.query(qry, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.sendStatus(200);
      }
    });
  }
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
router.post("/latestblockinfo", cors(), (req, resp) => {
  var sim_id = req.body.sim_id;
  var email = req.body.email;
  let email_valid = email.replace(/[@.]/g, "_");
  // TODO : Add numMiners and blockWindow to database
  // get subsidy halvings blocks
  let qry = `SELECT subsidy, halvings, sim_blocks, numtransactions FROM simulation WHERE sim_id = '${sim_id}'`;
  db.query(qry, (err, res) => {
    if (err) {
      console.log(err);
      res.status(400);
    } else {
      let subsidy = res[0].subsidy;
      let halvings = res[0].halvings;
      let sim_blocks = JSON.parse(res[0].sim_blocks);
      let previousHash = sim_blocks[sim_blocks.length - 1];
      let num_transactions = res[0].numtransactions;
      var block_height = sim_blocks.length + 1;
      // get timestamp
      let qry = `SELECT time_created FROM blocks_${email_valid} WHERE hash = '${previousHash}'`;
      db.query(qry, (err, re) => {
        if (err) {
          console.log(err);
          re.sendStatus(400);
        } else {
          timeStamp = new Date(re[0].time_created);
          timeStamp.setMinutes(timeStamp.getMinutes() + 10);
          resp
            .status(200)
            .send(
              subsidy,
              halvings,
              previousHash,
              num_transactions,
              block_height,
              timeStamp
            );
        }
      });
    }
  });
});

// Add a new block to an existing simulation
router.post("/addnewblock", cors(), (req, resp) => {
  var email = req.body.email;
  var sim_id = req.body.sim_id;
  let qry = ``;
  // Insert the new block hash into the simulation table's sim_blocks
  db.query(qry, (err, res) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } else {
      // Insert the new block into the blocks_user table
      db.query(qry, (err, res) => {
        if (err) {
          console.log(err);
          res.sendStatus(400);
        } else {
          // Insert the new block into the blocks_user table
          resp.status(200).send(res);
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

  let qry = `SELECT transactions FROM blocks_${email_valid} WHERE miner=${miner};`;

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
