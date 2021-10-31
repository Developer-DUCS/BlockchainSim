import blockCreator from "./block/block";

var blocks = [];
var hashes = [];
var previousHash;
const simulationCreator = (numBlocks, initialHash, timeStampArr, numMiners) => {
  previousHash = initialHash;
  console.log("time stamps:", timeStampArr);
  for (var i = 0; i < numBlocks; i++) {
    var newBlock = blockCreator(numMiners, previousHash, timeStampArr[i]);
    var hashID = newBlock[1];
    var blockJSON = newBlock[0];
    previousHash = hashID;

    blocks.push(blockJSON);
    hashes.push(hashID);
  }

  console.log("List of hashes:", hashes);
  console.log("List of blocks:", blocks);
};

export default simulationCreator;
