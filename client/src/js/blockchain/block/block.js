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
  halvings,
  totalCoin
) => {
  //console.log("Block num: ", block_height);
  var transInfo = createTransactions(
    miner,
    num_transactions,
    block_height,
    subsidy,
    halvings,
    totalCoin
  );

  var transactionJSON = transInfo[0];
  totalCoin = transInfo[1];

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

  if (block_height > 100)console.log("BLOCK HEIGHT: ", block_height);
  return [blockJSON, hashID, totalCoin];
};

module.exports = blockCreator;
