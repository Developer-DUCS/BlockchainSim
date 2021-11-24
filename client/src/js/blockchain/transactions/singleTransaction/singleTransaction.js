//create a single transaction
import inputSelection from "./inputsSingleTransaction";
import outputCreation from "./outputsSingleTransaction";

var version = "01000000";
//var input_count;  //determines how many inputs (UTXO's) to include
//var input;        // one or more UTXO's as input, multiple variables
//var output_count; //determines how many outputs (STXO's) to create
//var output;       // one or more STXO's as output, multiple variables
var locktime = "00000000"; // sets a minimum block height or unix time
                           // that the transaction can be included in




// create a JSON object (and transaction string hash?) 
// for a single transaction
function singleTransaction() {
    var input_count = 0;
    var input = inputSelection();
    var output_count = 0;
    var output = outputCreation();
    var transactionJSON = {
        input_count : input_count,
        input: input,
        output_count : output_count,
        output: output
    }
    var transactionString = ""
    //transaction string to be hashed -> Merkle Tree
    transactionString += transactionString.concat(
        version,
        input_count,
        input,
        output_count,
        output,
        locktime
    )
    //console.log(transactionJSON)
    return transactionJSON
}

    
    /*
    var transactionJSON = {
            version: version,
            input_count: input_count,
            input : input,
            output_count: output_count,
            output: output,
            locktime: locktime
    }

    // TO DO: hash transaction - send to merkle tree
    return transactionJSON
    */


export default singleTransaction