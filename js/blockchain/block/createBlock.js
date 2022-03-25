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
  wallets,
  UTXO_Pool,
  totalCoin
) => {
  let miningPool_to_array = JSON.parse(miningPool);
  var miner = chooseMiner(miningPool_to_array);
  let wallets_to_array = JSON.parse(wallets);
  let utxo_to_array = JSON.parse(UTXO_Pool);
  let wallet_array = [];

  for (let i = 0; i < wallets_to_array.length; i++) {
    let temp_wallet = [];
    Object.entries(wallets_to_array[i]).forEach(([key, value]) => {
      let temp_addresses = [];
      if (key == "hash") {
        temp_wallet.push(value);
      } else if (key == "owner") {
        temp_wallet.push(value);
      } else if (key == "simulation_id") {
        temp_wallet.push(value);
      } else if (key == "balance") {
        temp_wallet.push(value);
      } else if (key == "addresses") {
        value.forEach((element) => temp_addresses.push(element));
        temp_wallet.push(temp_addresses);
      }
    });
    wallet_array.push(temp_wallet);
  }

  let newBlock = blockCreator(
    previousHash,
    timeStamp,
    miner,
    num_transactions,
    block_height,
    subsidy,
    halvings,
    totalCoin,
    wallet_array,
    utxo_to_array
  );
  return newBlock;
};

module.exports = createBlock;
