// File to track addresses appearance given an initial address and a block height

// where is it connected
// do I need to call the API of do already have all the block needed?

const trackAddres = (inputs,outputs, blocks) => {
  var foundInputs = []
  var foundOutputs = []

  console.log(" initial Inputs: ", inputs);
  for (let i = 0; i < inputs.length; i++){
    var curInput = inputs[i][0]
    // go through blocks
    for (let b=0; b < blocks.length; b++){
      console.log(blocks[b])
      for (let t=0; t < blocks[b].transactions.length; t++){
        var posInput = blocks[b][t].transaction_data.receiver_address;
        console.log(posInput,curInput,posInput==curInput)
        if (posInput == curInput)
          foundOutputs.push(posInput)
      }
    }
  }

  //find first address block appearance
  // check if it is an input of an output
  // if output --> get input; which one of them if there is more than one? all?
  // if input --> find matching output in another block
  // do I want to store the transaction hash so we show it too?

  console.log("foundOutputs: ", foundOutputs)

  return [inputs, outputs];
};

export default trackAddres;
