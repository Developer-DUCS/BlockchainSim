/*
    CONSTRUCTION OF THE BLOCK - only one block per time

      Inputs need from simulation.js: 
            * NOT adressed yet *

        Outputs:
            * NOT adressed yet *
*/

const createHeader = require("../header");
const createTransactions = require("../transactions/transactions");
const createMerkleTree = require("./merkleTree");

const blockCreator = (
  previousHash,
  timeStamp,
  miner,
  num_transactions,
  block_height,
  subsidy,
  halvings
) => {
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

module.exports = blockCreator;
