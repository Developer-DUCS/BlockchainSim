import chooseMiner from "./miningPool";
import createHeader from "./header";
//import createTimeStamp from "./timeStamp";

//const =

const block = () => {
  var miner = chooseMiner();
  var header = createHeader();
  //var timeStamps = createTimeStamp(initialTimeStamp)

  console.log("Miner: ", miner);
};

export default block;
