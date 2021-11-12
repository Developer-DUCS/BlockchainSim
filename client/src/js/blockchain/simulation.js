import blockCreator from "./block/block";

var previousHash;
const simulationCreator = (numBlocks, initialHash, timeStampArr, numMiners) => {
  var blocks = [];
  var hashes = [];
  previousHash = initialHash;

  for (var i = 0; i < numBlocks; i++) {
    var newBlock = blockCreator(numMiners, previousHash, timeStampArr[i]);
    var hashID = newBlock[1];
    var blockJSON = newBlock[0];
    previousHash = hashID;

    blocks.push(blockJSON);
    hashes.push(hashID);
  }

  return [hashes, blocks];
};

export default simulationCreator;
