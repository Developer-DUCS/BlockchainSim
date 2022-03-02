// File to track addresses appearance given an initial address and a block height

// where is it connected
// do I need to call the API of do already have all the block needed?

const trackAddres = (inputs,outputs, blocks) => {
  var wInputs = []
  var wOutputs = []
  var adrInputs = []
  var adrOutputs = []
  var allInfoInputs = []
  var allInfoOutpus = []
  
  var posInput
  var outFound = false;
  var inFound = false;
  var numAdr2Find = outputs.length + inputs.length

  //var curOutput = outputs[0];
  console.log(" Output to find: ", outputs, blocks.length);
  console.log(" Inputs: ", inputs);
  for (let j=0; j < blocks.length; j++){ // change for while loop
    var ts = blocks[j].transactions;
    if(typeof(ts) == "string") ts = JSON.parse(ts)
    for(let i=0; i< ts.length; i++){
      let t = ts[i];
      if (t[0] != undefined){ // check if it not getting inside here
        //console.log(t.length)
      }else{ //only one transaction
  
        // i need to get two output but i am getting one only
        for (let ele=0; ele<t.transaction_data.addresses_input_UTXO.length;ele++){
          var found = t.transaction_data.addresses_input_UTXO.find(adr => {
            if(adr == outputs[ele]){return adr}
            else if (adr.includes("00000000000000") && outputs[ele].includes("00000000000000")){ return adr} 
          });
          if (found != undefined && !adrInputs.includes(found)){
            var b_weigth = t.transaction_data.block_height;
            var newInput = [found, b_weigth];
            allInfoInputs.push(newInput);
            console.log(" new input found: ", newInput)
            wInputs.push(b_weigth);
            adrInputs.push(found);
          }
        }

      }

    }
  }

  console.log(" blocks found for inputs: ", wInputs);
  console.log(" full info found inputs: ", allInfoInputs);
  console.log(" addresses inputs found: ", adrInputs)

  return [inputs, wInputs];
};

export default trackAddres;
