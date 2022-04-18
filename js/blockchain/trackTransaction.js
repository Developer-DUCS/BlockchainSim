const trackAddres = (curInputs, curOutputs, blocks) => {
  var laterInputs = []; //given outputs, block heigh of inputs found later on in the chain
  var previousOutputs = []; // given inputs, block heighs of outpus found previously in the chain
  var adrLInputs = []; // addresses of Later inputs
  var adrPOutputs = []; // addresses of previous Outputs
  var end = false;
  var empyLeftover = false;

  console.log("Inputs: ", curInputs);
  console.log("Outputs: ", curOutputs);

  for (let j = 0; j < blocks.length; j++) {
    var ts = blocks[j].transactions; // transactions of block j
    if (typeof ts == "string") ts = JSON.parse(ts);
    for (let i = 0; i < ts.length; i++) {
      let t = ts[i]; // transaction i inside ts (block j)
      let tAddresses = ts[i].transaction_data.addresses_input_UTXO; // transaction addresses

      // Look throught the throught the output array for matching posterior inputs
      for (let ele = 0; ele < curOutputs.length; ele++) {
        var found = tAddresses.find((adr) => {
          if (
            adr.includes("00000000") &&
            curOutputs[ele].includes("0000000") &&
            !empyLeftover
          ) {
            laterInputs.push({ transaction_data: { block_height: -3 - 1 } });
            adrLInputs.push("IGNORE");
            empyLeftover = true;
          } else if (adr == curOutputs[ele]) {
            return adr;
          }
        });
        if (found != undefined && !adrLInputs.includes(found)) {
          if (!found.includes("0000000000000")) {
            t.actualAddress = found;
            laterInputs.push(t);
            adrLInputs.push(found);
          }
          if (found == undefined) {
            console.log("ELE: ", ele);
          }
        }
      }

      // Look throught the input array for matching previous outputs
      if (!curInputs[0].includes("00000000000000")) {
        for (let ele = 0; ele < curInputs.length; ele++) {
          if (t.transaction_data.receiver_address == curInputs[ele]) {
            var foundOut = t.transaction_data.receiver_address;
          } else if (
            t.transaction_data.sender_leftover_address == curInputs[ele]
          ) {
            foundOut = t.transaction_data.sender_leftover_address;
          } else {
            found = undefined;
          }
          if (foundOut != undefined && !adrPOutputs.includes(foundOut)) {
            t.actualAddress = foundOut;
            previousOutputs.push(t);
            adrPOutputs.push(foundOut);
          }
        }
      } else if (!end) {
        // input is BLOCKCHAIN so there is no possible previous output
        previousOutputs.push({ transaction_data: { block_height: -1 - 1 } });
        adrPOutputs.push("BLOCKCHAIN");
        end = true;
      }
    }
  }

  while (curOutputs.length != laterInputs.length) {
    laterInputs.push({ transaction_data: { block_height: -2 - 1 } });
  }

  console.log(" blocks found for inputs: ", laterInputs);
  console.log(" blocks found for outputs: ", previousOutputs);
  return [previousOutputs, laterInputs];
};

module.exports = trackAddres;
