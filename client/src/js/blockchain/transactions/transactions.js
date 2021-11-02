

import inputSelection from "../transactions/singleTransactionInputs";
import outputCreation from "../transactions/singleTransactionOutputs";

var version = "01000000"
var input_count //determines how many inputs (UTXO's) to include
var input // one or more UTXO's as input, multiple variables
var output_count //determines how many outputs (STXO's) to create
var output // one or more STXO's as output, multiple variables
var locktime = "00000000" // sets a minimum block height or unix time 
                          // that the transaction can be included in

// https://learnmeabitcoin.com/technical/transaction-data 
// good resource on transaction data

transaction = ""
input = inputSelection();
output = outputCreation();

transaction += transaction.concat(
    version,
    input_count,
    input,
    output_count,
    output,
    locktime
    );

//TO DO:
//      1.) Create a pool of transactions to be included
//
//      2.) Determine how to store varying amounts of inputs and outputs 
//          - (UTXO's and STXO's)
//      4/) Pass finished transactions to merkle tree to be hashed


