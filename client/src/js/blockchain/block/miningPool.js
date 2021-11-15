/*
    POOL OF MINERS - select the winer miner from mining a block out of a randomize list of miners 

        Inputs need from simulation.js: 
            -Number of miners

        Outputs:
            - Winer miner

    * Possible change for proof of work and proof of stake *

*/

import App from "../../../App";

//var numMiners;

const randomSelector = (min, max) => {
  let num = Math.random() * (max - min) + min;
  return Math.floor(num);
};

  var miningPool = [];

  const createMinerPool= (numMiners)=> {
  for (var i = 0; i < numMiners; i++) {
    var miner = (Math.random() + 1).toString(36).substring(2);
    miningPool.push(miner);
  }

  return miningPool;
}

const chooseMiner = (miningPool, numMiners) => {

  var randomMinerNum = randomSelector(0, numMiners - 1);
  var selectedMiner = miningPool[randomMinerNum];
  //console.log(selectedMiner)
  return selectedMiner;
};

export default chooseMiner;
export {createMinerPool};
