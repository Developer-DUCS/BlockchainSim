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



//sim_blocks JSON object
const sim_blocks = {
  1: "0104db27ef0e770ea5b0786880ee0883b13b04eeb7c34acebc77c4e47957ae95",
  2: "081d730172ca30cd21eaf9f2c6eb41d70b6ff64910b6ce959a0505be0ba729de",
  3: "076b23542004b61dea24d6ceef487ee81fcf7ecde0ce0a726e07550c6e6a39f4",
  4: "014ae7f504e6ac8439ad29f8bdafcfed4ec3d74364dbb0ffdc8df8827861439f",
  5: "00452e6e3a9450d6a8366a12db71c771a42ce6e93bf85912ac51d4434e721add",
};

//header JSON Object
const header = {
  "version" : "00000020",
  "previousHash" : "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
  "merkleTree" : "113459eb7bb31bddee85ade5230d6ad5d8b2fb52879e00a84ff6ae1067a210d3",
  "target" : "00000000", 
  "nonce" : "16c4c4b0"
}

//transactions JSON object
const transactions;

