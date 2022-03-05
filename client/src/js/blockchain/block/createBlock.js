/*
    --> createBlock.js FILE

    This file allows a user to add a single block to their simulation. 
    Information is randomly generated.

    --> INPUTS:
      - previousHash:
      - timeStamp:
      

    --> OUTPUTS:
      - block:

    *CONNECTIONS*:
      - Files called from block.js (blockCreator()), wallet
      - File calls: 
        * 
*/

// TODO: we may need to store the UTXO_Pool in the data base
const blockCreator = require("./block");
const { chooseMiner } = require("./miningPool");

const createBlock = (
  previousHash,
  timeStamp,
  num_transactions,
  block_height,
  subsidy,
  halvings,
  miningPool,
  wallets,
  UTXO_Pool,
  totalCoin
) => {
  var miner = chooseMiner(miningPool);
  let newBlock = blockCreator(
    previousHash,
    timeStamp,
    miner,
    num_transactions,
    block_height,
    subsidy,
    halvings,
    totalCoin,
    wallets,
    UTXO_Pool
  );
  return newBlock;
};

export default createBlock;
