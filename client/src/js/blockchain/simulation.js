import blockCreator from "./block/block";
import chooseMiner from "./block/miningPool";
import {
  add_element_to_array,
  get_element_from_array,
} from "../utils/array_utils";
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
  var simulation = {
    blocks: [],
    hashes: [],
  };
  previousHash = initialHash;

  // Create blocks for simulation
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

    simulation = addBlockAndHashToSimulation(simulation, blockJSON, hashID);
  }

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
  //TO DELETE LATER DELETE ADRESSES POOL
  adressesPool.length = 0;

  return [simulation.hashes, simulation.blocks];
};

export default simulationCreator;
