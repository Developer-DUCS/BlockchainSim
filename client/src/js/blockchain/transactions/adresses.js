//import chooseMiner from "..block/miningPool";
//import createMinerPool from "..block/miningPool";

const express = require("express");
const app = express();
const router = express.Router();
//const db = require("../../../../../dbConn");
const cors = require("cors");
const miningPool = require("../../../components/CreateSimulationPage");
var richMiners = []; //miners with money (just bitcoin reward initially)

/*
// create an array of miners w/ money from bitcoin reward
router.get("/getAddress", cors(), (req, res) => {
  qry = `SELECT miner FROM blocks_sean_lowry_com`; //make this dynamic
  db.query(qry, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      for (i = 0; i < res.length; i++) {
        richMiners.push(res[i].miner);
      }
      console.log("Rich Miners: " + JSON.stringify(richMiners));
      //res.sendStatus(200);
    }
  });
});
*/

subsidy = 50; //basecoin transaction AKA bitcoin reward AKA subsidy
addresses = {};
for (i = 0; i < richMiners.length; i++) {
  addresses.push([richMiners[i], subsidy]);
}
console.log("Addresses: " + addresses);
console.log("MiningPool: " + miningPool);

/* 
TO DO:
    1. Create random transactions ***
        - get a list of all miners w/ money DONE
        - get a list of anyone we can send money to 
            - create a pool of users (not just miners)
        - make a randomTransaction function 
        - make a pool of transactions to be included in blocks
        - select and delete transactions from the pool
        - no transactions before block 100 
*/

module.exports = router;
//module.exports = addresses;
