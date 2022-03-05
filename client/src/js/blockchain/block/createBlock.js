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
  wallets
) => {
  var miner = chooseMiner(miningPool);
  let newBlock = blockCreator(
    previousHash,
    timeStamp,
    miner,
    num_transactions,
    block_height,
    miningPool,
    wallets,
    subsidy,
    halvings
  );
  return newBlock;
};

export default createBlock;
