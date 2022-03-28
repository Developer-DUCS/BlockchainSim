const blockCreator = require("./block/block");
const { chooseMiner } = require("./block/miningPool");
const { createWallet } = require("./wallet");
//const { UTXO_Pool } = require("./transactions/UTXO_Pool");

/*
    --> SIMULATION.js 
        Main file where a simulation is created 

    --> INPUTS:
      - numBlocks: total number of blocks to include in the simulation
      - initialHash: hash of block 0
      - timeStampArr: array with all timeStamps to asign to the block created in createSimulation.js
      - miningPool: pool of miners/users randomly generated in createSimulation.js
      - user: current user using the app
      - num_transaction: max number of transaction to include in the block

    --> OUTPUTS:
      - Hashes: array with all the block hashes to be able to identify the blocks easily
      - Blocks: array with each individual block as a json object

    *CONNECTIONS*:
      - File called from createSimulation.js 
      - File calls: 
        * chooseMiner() (miningPool.js) --> choose a user from already created pool of miners
        * blockCreator() (block.js) --> creates a block with given inputs and return an array with the block as a json and a hash ID
        * createAdressPoolHeader() (adressPool.js) --> initializes empty adresses pool
        * adressesPool (adressesPool.js) --> dynamic pool with all non spended UTXOs
*/

const totalCoinBlockChain = (subsidy, numBlocks, halving) => {
  //calculate coin in transit manually
  var curSubsidy = subsidy;
  var totalTransit = 0;
  for (var i = 1; i <= numBlocks; i++) {
    if (i != 1 && (i - 1) % halving == 0) {
      curSubsidy = curSubsidy / 2;
    }
    totalTransit += curSubsidy;
  }
};

var previousHash;
const simulationCreator = (
  numBlocks,
  initialHash,
  timeStampArr,
  miningPool,
  user,
  num_transactions,
  subsidy,
  halvings,
  //totalCoin, COMMENTED THIS OUT BC TOTALCOIN INIT TO 0 AND IDK WHAT TO PASS IN FROM SIM CREATOR IN DATA.JS
  wallets
) => {
  var totalCoin = 0;
  var blocks = []; // store block json objects
  var hashes = []; // store hash ID of each block
  var UTXO_pool = [];
  previousHash = initialHash;

  for (var i = 0; i < numBlocks; i++) {
    var selectMiner;

    //first block assigned to user, rest random
    i == 0 ? (selectMiner = user) : (selectMiner = chooseMiner(miningPool));
    var block_height = i;

    //create block
    var newBlock = blockCreator(
      previousHash,
      timeStampArr[i],
      selectMiner,
      num_transactions,
      block_height,
      subsidy,
      halvings,
      totalCoin,
      wallets,
      UTXO_pool
    );

    var hashID = newBlock[1];
    var blockJSON = newBlock[0];
    totalCoin = newBlock[2];
    wallets = newBlock[3];
    UTXO_pool = newBlock[4];
    previousHash = hashID; // store hash to add to next block
    blocks.push(blockJSON); //add to the list
    hashes.push(hashID);
  }

  totalCoinBlockChain(subsidy, numBlocks, halvings); // calculate coin in transaction
  return [hashes, blocks, wallets, UTXO_pool];
};

module.exports = simulationCreator;
