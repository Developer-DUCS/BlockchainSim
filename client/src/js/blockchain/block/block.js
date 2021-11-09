/*
    CONSTRUCTION OF THE BLOCK - only one block per time

      Inputs need from simulation.js: 
            * NOT adressed yet *

        Outputs:
            * NOT adressed yet *
*/

import { chooseMiner } from "./miningPool";
import createHeader from "../header";

const merkleTree = //TO DO: to not be hardcode
  "113459eb7bb31bddee85ade5230d6ad5d8b2fb52879e00a84ff6ae1067a210d3";

const NUM_MINERS = 100; // TO DO: change when simulation connected

const blockCreator = (numMiners, previousHash, timeStamp, miningPool) => {
  var miner = chooseMiner(miningPool, numMiners);
  var header = createHeader(previousHash, merkleTree);
  var hashID = header[0];
  var headerJSON = header[1];
  var transactionJSON = {};

  var blockJSON = {
    header: headerJSON,
    transaction: transactionJSON,
    transaction_counter: 0,
    miner: miner,
    time_created: timeStamp,
  };

  return [blockJSON, hashID];
};

export default blockCreator;
