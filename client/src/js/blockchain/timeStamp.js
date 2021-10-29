const stampTimes = [];
const WINDOW_TIME = 600; //10 Minutes
const TIME_VARIATION_WINDOW = 30; //30 Seconds
const NUM_BLOCKS = 20;

const createTimeStamp = (initTime) => {
  let aInitTime = initTime[1].split(":");
  let aInitDate = initTime[0].split("/");

  var genesisDate = new Date( //create Date genesis block from user election
    aInitDate[2],
    aInitDate[0],
    aInitDate[1],
    aInitTime[0],
    aInitTime[1],
    aInitTime[2]
  );
  stampTimes.push(genesisDate); //initial Date genesis block

  var currTimeStamp = genesisDate;
  for (var i = 0; i < NUM_BLOCKS; i++) {
    //Obtain time stamps for blocks
    let randomTime = Math.random() * TIME_VARIATION_WINDOW;
    var newTimeMillisec =
      currTimeStamp.getTime() + WINDOW_TIME * 1000 + randomTime * 1000;
    var currDate = new Date(newTimeMillisec);
    currTimeStamp = currDate;
    currDate = currDate.toISOString().slice(0, 19).replace("T", " ");
    stampTimes.push(currDate);
  }

  //console.log(stampTimes);
};

export default createTimeStamp;
