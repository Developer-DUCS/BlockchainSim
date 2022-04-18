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
  totalCoin,
  wallets,
  UTXO_Pool,
  mining
) => {
  var transInfo = createTransactions(
    miner,
    num_transactions,
    block_height,
    subsidy,
    halvings,
    totalCoin,
    wallets,
    UTXO_Pool,
    mining
  );

  var transactionJSON = transInfo[0];
  totalCoin = transInfo[1];
  wallets = transInfo[2];
  UTXO_Pool = transInfo[3];

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
  return [blockJSON, hashID, totalCoin, wallets, UTXO_Pool];
};

module.exports = blockCreator;
