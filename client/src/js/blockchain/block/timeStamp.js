/*
    --> TIMESTAMP.js FILE

    --> INPUTS:
      - initTime: time of creation of the genesis block
      - numblocks: number of blocks in the simulation
      - windowTime: time diference in between block creation

    --> OUTPUTS:
      - timeStamps:  array with all individual time stamps to be added to the blocks once created

    *CONNECTIONS*:
      - File called from createSimulation.js

    --> Time stamp: 
      - Time in ISO that says when a block was created in time 
*/

const TIME_VARIATION_WINDOW = 30; //30 Seconds

const createTimeStamp = (initTime, numblocks, windowTime) => {
  const stampTimes = []; // array to store time stamps

  //get initial time in seconds
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

  let temp = genesisDate.toISOString().slice(0, 19).replace("T", " "); // transform to ISO format
  stampTimes.push(temp); //initial Date genesis block
  var currTimeStamp = genesisDate;

  //Obtain time stamps for blocks
  for (var i = 0; i < numblocks; i++) {
    let randomTime = Math.random() * TIME_VARIATION_WINDOW;
    var newTimeMillisec =
      currTimeStamp.getTime() + secWindowTime * 1000 + randomTime * 1000; // get time in millisec
    var currDate = new Date(newTimeMillisec); // construct new date
    currTimeStamp = currDate;
    currDate = currDate.toISOString().slice(0, 19).replace("T", " "); // transform to ISO format
    stampTimes.push(currDate); // add to array
  }

  return stampTimes;
};

export default createTimeStamp;
