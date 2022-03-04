// File to track addresses appearance given an initial address and a block height

// where is it connected
// do I need to call the API of do already have all the block needed?

const trackAddres = (inputs,outputs, blocks) => {
  var wInputs = []
  var wOutputs = []
  var adrInputs = []
  var adrOutputs = []
  var allInfoInputs = []
  var allInfoOutputs = []
  
  var posInput
  var end = false;
  var numAdr2Find = outputs.length + inputs.length

  console.log(" Output to find: ", outputs);
  console.log(" Inputs: ", inputs);
  for (let j=0; j < blocks.length; j++){ // change for while loop
    var ts = blocks[j].transactions;
    if(typeof(ts) == "string") ts = JSON.parse(ts)
    for(let i=0; i< ts.length; i++){
      let t = ts[i];
      if (t[0] != undefined){ // check if it not getting inside here
        //console.log(t.length)
      }else{ //only one transaction
  
        // Look throught the throught the output array for matching posterior inputs
        // TODO: check if the output has not been used yet
        for (let ele=0; ele < outputs.length; ele++){
          var found = t.transaction_data.addresses_input_UTXO.find(adr => {
            if(adr == outputs[ele]){return adr}
            else if (adr.includes("00000000000000") && outputs[ele].includes("00000000000000")){ return adr} 
          });
          if (found != undefined && !adrInputs.includes(found)){
            var b_weigth = t.transaction_data.block_height;
            var newInput = [found, b_weigth];
            allInfoInputs.push(newInput);
            wInputs.push(b_weigth);
            adrInputs.push(found);
          }
        }
        while (!(wInputs.length == outputs.length)){
          wInputs.push(-2) //indicates that address is still on utxo_pool
        }
        

        // Look throught the input array for matching previous outputs
        if (!inputs[0].includes("00000000000000")){
          for (let ele=0; ele < inputs.length; ele++){
            if(t.transaction_data.receiver_address == inputs[ele]){
            var foundOut = t.transaction_data.receiver_address;
            }
            else if (t.transaction_data.sender_leftover_address == inputs[ele]){
              foundOut = t.transaction_data.sender_leftover_address;
            }
            else{ found = undefined}
            if (foundOut != undefined && !adrOutputs.includes(foundOut)){
              var b_weigth = t.transaction_data.block_height;
              var newOutput = [foundOut, b_weigth];
              allInfoOutputs.push(newOutput);
              wOutputs.push(b_weigth);
              adrOutputs.push(foundOut);
            }
          }
        }
        else if (!end){ // input is BLOCKCHAIN so there is no possible previous output
          var newOutput = [ "BLOCKHAIN", -1];
          allInfoOutputs.push(newOutput);
          wOutputs.push(-1);
          adrOutputs.push("BLOCKCHAIN");
          end = true;
        }
      
      }
    }
  }

  console.log(" blocks found for inputs: ", wInputs);
  //console.log(" full info found inputs: ", allInfoInputs);
  //console.log(" addresses inputs found: ", adrInputs)

  console.log(" blocks found for outputs: ", wOutputs);
  //console.log(" full info found outputs: ", allInfoOutputs);
  //console.log(" addresses inputs outputs: ", adrOutputs) 
  return [inputs, wInputs];
};

export default trackAddres;
