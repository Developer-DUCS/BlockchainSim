import chooseMiner from "./miningPool";
import createHeader from "./header";
//import createTimeStamp from "./timeStamp";

const previousHash = //TO DO: to not be hardcode
  "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8";
const merkleTree = //TO DO: to not be hardcode
  "113459eb7bb31bddee85ade5230d6ad5d8b2fb52879e00a84ff6ae1067a210d3";

const block = () => {
  var miner = chooseMiner();
  var header = createHeader(previousHash, merkleTree);
  //var timeStamps = createTimeStamp(initialTimeStamp)

  console.log("Miner: ", miner);
  console.log("Header:", header);
};

export default block;
