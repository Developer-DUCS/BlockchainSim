import blockCreator from "./block/block";

const NUM_MINERS = 100;
const NUM_BLOCK = 20;

const simulationCreator = () => {
  var newBlock = blockCreator(NUM_MINERS);
  var hashID = newBlock[1];
  var blockJSON = newBlock[0];

  console.log("New Block:", newBlock);
};

export default simulationCreator;
