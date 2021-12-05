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
    if (i % 50 == 1)
      console.log("Adresses Pool at block", i, ":", adressesPool);
    i == 0 ? (selectMiner = user) : (selectMiner = chooseMiner(miningPool));
    var newBlock = blockCreator(
      previousHash,
      timeStampArr[i],
      selectMiner,
      num_transactions,
      i,
      miningPool
    );
    var hashID = newBlock[1];
    var blockJSON = newBlock[0];

    previousHash = hashID;

    blocks.push(blockJSON);
    hashes.push(hashID);
  }

  return [hashes, blocks];
};

export default simulationCreator;
