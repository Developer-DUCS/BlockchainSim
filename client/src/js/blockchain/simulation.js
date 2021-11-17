import blockCreator from "./block/block";
import chooseMiner from "./block/miningPool";

var previousHash;
const simulationCreator = (
  numBlocks,
  initialHash,
  timeStampArr,
  miningPool
) => {
  var blocks = [];
  var hashes = [];
  previousHash = initialHash;

  for (var i = 0; i < numBlocks; i++) {
    var selectMiner = chooseMiner(miningPool);
    var newBlock = blockCreator(previousHash, timeStampArr[i], selectMiner);
    var hashID = newBlock[1];
    var blockJSON = newBlock[0];

    previousHash = hashID;

    blocks.push(blockJSON);
    hashes.push(hashID);
  }

  return [hashes, blocks];
};

export default simulationCreator;
