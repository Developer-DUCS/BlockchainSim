/*

1.) inputs - decide how many inputs (input_count) will be 
    included in this transaction. 
    - inputSelection function returns the contents of one UTXO 
    - as a concatenated string of hexadecimals
    
    TO DO:  implement UTXO's and STXO's. These are the unpsent and spent 
            transaction outputs

*/

var inputs = [];
const inputSelection = () =>{

    // no parameters or functions just yet.

    // we probably won't use all these variables, 
    // but these are all the fields inside a single input 

    var TXID = "0000000000000000000000000000000000000000000000000000000000000000" 
        // refers to an existing transaction 
    var VOUT =  "FFFFFFFF" 
        // select one of its outputs
    var scriptSig_size = "aa" 
        // indicates the upcoming size of the unlocking code
    var scriptSig = "bb" 
        // a script that unlocks the input
    var sequence = "00000000" 
        // ? 
    inputs = inputs.concat(TXID, VOUT, scriptSig_size, scriptSig, sequence)
    
    return inputs //just a string right now
}

export default inputSelection;