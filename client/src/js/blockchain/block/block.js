/*
    CONSTRUCTION OF THE BLOCK - only one block per time

      Inputs need from simulation.js: 
            * NOT adressed yet *

        Outputs:
            * NOT adressed yet *
*/

import createHeader from "../header";
import createTransactions from "../transactions/transactions";
import createMerkleTree from "./merkleTree";

const blockCreator = (
  previousHash,
  timeStamp,
  miner,
  num_transactions,
  block_height,
  subsidy,
  halvings
) => {
  //console.log("Block num: ", block_height);
  // create transactions - before Merkleroot
  var transactionJSON = createTransactions(
    miner,
    num_transactions,
    block_height,
    subsidy,
    halvings
  );

  var merkleRoot = createMerkleTree(transactionJSON);
  var header = createHeader(previousHash, merkleRoot); // create header of the block
  var hashID = header[0];
  var headerJSON = header[1];

  // create the block object
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
