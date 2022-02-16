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
const { createWallet } = require("../wallet");
const { createMinerPool, chooseMiner } = require("./miningPool");

const createBlock = (
  previousHash,
  timeStamp,
  num_transactions,
  block_height,
  subsidy,
  halvings,
  email
) => {
  var miningPool = createMinerPool(50, email);
  var wallets = createWallet(miningPool);
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
