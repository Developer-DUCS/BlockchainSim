//const WINDOW_TIME = 600; //10 Minutes
const TIME_VARIATION_WINDOW = 30; //30 Seconds

const createTimeStamp = (initTime, numblocks, windowTime) => {
  const stampTimes = [];
  let aInitTime = initTime[1].split(":");
  let aInitDate = initTime[0].split("-");
  let secWindowTime = windowTime * 60; //pass to seconds

  var genesisDate = new Date( //create Date genesis block from user election
    aInitDate[0],
    aInitDate[1],
    aInitDate[2],
    aInitTime[0],
    aInitTime[1]
  );

  let temp = genesisDate.toISOString().slice(0, 19).replace("T", " ");
  stampTimes.push(temp); //initial Date genesis block
  var currTimeStamp = genesisDate;

  for (var i = 0; i < numblocks; i++) {
    //Obtain time stamps for blocks
    let randomTime = Math.random() * TIME_VARIATION_WINDOW;
    var newTimeMillisec =
      currTimeStamp.getTime() + secWindowTime * 1000 + randomTime * 1000;
    var currDate = new Date(newTimeMillisec);
    currTimeStamp = currDate;
    currDate = currDate.toISOString().slice(0, 19).replace("T", " ");
    stampTimes.push(currDate);
  }

  return stampTimes;
};

export default createTimeStamp;
