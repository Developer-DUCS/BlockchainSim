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

const createMinerPool = (numMiners, user) => {
  var miningPool = [];
  for (var i = 0; i < numMiners - 1; i++) {
    var miner = (Math.random() + 1).toString(36).substring(2);
    miningPool.push(miner);
  }

  miningPool.push(user);
  return miningPool;
};

const chooseMiner = (miningPool) => {
  var randomMinerNum = randomSelector(0, miningPool.length - 1);
  var selectedMiner = miningPool[randomMinerNum];
  //console.log(selectedMiner)
  return selectedMiner;
};

export default chooseMiner;
export { createMinerPool };
