import blockCreator from "./block/block";
import chooseMiner from "./block/miningPool";
import {
  add_element_to_array,
  get_element_from_array,
} from "../utils/array_utils";

var previousHash;
const simulationCreator = (
  numBlocks,
  initialHash,
  timeStampArr,
  miningPool,
  user
) => {
  var simulation = {
    blocks: [],
    hashes: [],
  };
  previousHash = initialHash;

  for (var i = 0; i < numBlocks; i++) {
    var selectMiner;
    i == 0 ? (selectMiner = user) : (selectMiner = chooseMiner(miningPool));
    //selectMiner = chooseMiner(miningPool);
    var newBlock = blockCreator(
      previousHash,
      get_element_from_array(timeStampArr, i),
      selectMiner
    );
    var hashID = newBlock[1];
    var blockJSON = newBlock[0];

    previousHash = hashID;

    simulation = addBlockAndHashToSimulation(simulation, blockJSON, hashID);
  }

  // return [hashes, blocks];
  return [simulation.hashes, simulation.blocks];
};

const addBlockAndHashToSimulation = (simulation, block, hash) => {
  let simNew = {};
  simNew.blocks = addBlockToSimulation(simulation.blocks, block);
  simNew.hashes = addHashToSimulation(simulation.hashes, hash);
  return simNew;
};

const addBlockToSimulation = (simulationBlocks, block) => {
  let simulationBlocksCopy = simulationBlocks.slice();
  simulationBlocksCopy = add_element_to_array(simulationBlocksCopy, block);
  return simulationBlocksCopy;
};

const addHashToSimulation = (simulationHashes, hash) => {
  let simulationHashesCopy = simulationHashes.slice();
  simulationHashesCopy = add_element_to_array(simulationHashesCopy, hash);
  return simulationHashesCopy;
};

export default simulationCreator;
