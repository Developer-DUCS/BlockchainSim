/*
    CONSTRUCTION OF THE BLOCK - only one block per time

      Inputs need from simulation.js: 
            * NOT adressed yet *

        Outputs:
            * NOT adressed yet *
*/

//import chooseMiner from "./miningPool";
//import createMinerPool from "./miningPool";
import { createHeader, getHeaderHash, getHeaderJSON } from "../header";
import createTransactions from "../transactions/transactions";

const merkleTree = //TO DO: to not be hardcode
  "113459eb7bb31bddee85ade5230d6ad5d8b2fb52879e00a84ff6ae1067a210d3";

const blockCreator = (
  previousHash,
  timeStamp,
  miner,
  num_transactions,
  block_height,
  miningPool
) => {
  var header = createHeader(previousHash, merkleTree);
  var hashID = getHeaderHash(header);
  var headerJSON = getHeaderJSON(header);
  var transactionJSON = createTransactions();

  var blockJSON = {
    id_block: hashID,
    header: headerJSON,
    transaction: transactionJSON,
    transaction_counter: 1,
    miner: miner,
    time_created: timeStamp,
  };

  return [blockJSON, hashID];
};

export default blockCreator;
