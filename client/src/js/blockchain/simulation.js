import blockCreator from "./block/block";
import chooseMiner from "./block/miningPool";
import createAdressPoolHeader, {
  adressesPool,
} from "./transactions/adressesPool";
import createWallet from "./wallet";

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

var previousHash;
const simulationCreator = (
  numBlocks,
  initialHash,
  timeStampArr,
  miningPool,
  user,
  num_transactions
) => {
  var blocks = []; // store block json objects
  var hashes = []; // store hash ID of each block
  previousHash = initialHash;

  //initialize wallets
  var wallets = createWallet(miningPool);

  //initialize adress/transaction pool
  createAdressPoolHeader(miningPool.length);

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
      miningPool,
      wallets
    );
    var hashID = newBlock[1];
    var blockJSON = newBlock[0];

    previousHash = hashID; // store hash to add to next block

    blocks.push(blockJSON); //add to the list
    hashes.push(hashID);
  }

  adressesPool.length = 0; //reset adresses pool to be empty again

  return [hashes, blocks];
};

export default simulationCreator;
