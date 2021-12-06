import blockCreator from "./block/block";
import chooseMiner from "./block/miningPool";
import createAdressPoolHeader from "./transactions/adressesPool";
import { adressesPool } from "./transactions/adressesPool";

var previousHash;
const simulationCreator = (
  numBlocks,
  initialHash,
  timeStampArr,
  miningPool,
  user,
  num_transactions
) => {
  var blocks = [];
  var hashes = [];
  previousHash = initialHash;

  //initialize adress/transaction pool
  createAdressPoolHeader(miningPool.length);

  for (var i = 0; i < numBlocks; i++) {
    var selectMiner;
    i == 0 ? (selectMiner = user) : (selectMiner = chooseMiner(miningPool));
    var block_height = i;
    var newBlock = blockCreator(
      previousHash,
      timeStampArr[i],
      selectMiner,
      num_transactions,
      block_height,
      miningPool
    );
    var hashID = newBlock[1];
    var blockJSON = newBlock[0];

    previousHash = hashID;

    blocks.push(blockJSON);
    hashes.push(hashID);
  }

  //TO DELETE LATER
  /* var counter = 0;
  console.log(adressesPool[0]);
  for (var i = 0; i < adressesPool; i++) {
    console.log(adressesPool[i]);
    for (var j = 0; j < adressesPool[i]; j++) {
      console.log(adressesPool[i][j]);
      counter++;
    }
  }
  console.log("addresses in the pool after creating simulation: ", counter); */

  return [hashes, blocks];
};

export default simulationCreator;
