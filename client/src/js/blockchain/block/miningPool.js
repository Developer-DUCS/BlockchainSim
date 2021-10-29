const NUMBER_OF_MINERS = 100;

const random = (min = 0, max = NUMBER_OF_MINERS - 1) => {
  let num = Math.random() * (max - min) + min;
  return Math.floor(num);
};

const chooseMiner = () => {
  var miningPool = [];
  for (var i = 0; i < NUMBER_OF_MINERS; i++) {
    var miner = (Math.random() + 1).toString(36).substring(2);
    miningPool.push(miner);
  }

  var randomMiner = random();
  var selectedMiner = miningPool[randomMiner];

  return selectedMiner;
};

export default chooseMiner;
