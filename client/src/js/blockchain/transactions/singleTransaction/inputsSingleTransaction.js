var inputs = [];
const inputSelection = () =>{
    // no parameters or functions just yet
    // we probably won't use all these variables, but these are all the fields in a transaction
    var TXID = "0000000000000000000000000000000000000000000000000000000000000000" //refer to an existing transaction 
    var VOUT =  "FFFFFFFF" // select one of its outputs
    var scriptSig_size = "aa" // indicates the upcoming size of the unlocking code
    var scriptSig = "bb" // a script that unlocks the input
    var sequence = "00000000" // 
    inputs = inputs.concat(TXID, VOUT, scriptSig_size, scriptSig, sequence)
    return inputs
}

export default inputSelection;