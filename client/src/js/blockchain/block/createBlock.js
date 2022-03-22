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
  let miningPool_to_array = JSON.parse(miningPool);
  var miner = chooseMiner(miningPool_to_array);
  let wallets_to_array = JSON.parse(wallets);
  let utxo_to_array = JSON.parse(UTXO_Pool);
  console.log("Miner in createBlock.js" + miner);
  console.log("previousHash in createBlock.js" + previousHash);
  console.log("timeStamp in createBlock.js" + timeStamp);
  console.log("***************************" + num_transactions);
  console.log("block height in createBlock.js" + block_height);

  console.log("Wallest to array 0" + wallets_to_array[0]);

  let newBlock = blockCreator(
    previousHash,
    timeStamp,
    miner,
    num_transactions,
    block_height,
    subsidy,
    halvings,
    totalCoin,
    wallets_to_array,
    utxo_to_array
  );
  console.log("New Block hash in createBlock.js: " + newBlock[1]);
  return newBlock;
};

export default createBlock;
