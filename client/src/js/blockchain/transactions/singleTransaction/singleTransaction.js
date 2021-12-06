//create a single transaction
import { getAdress } from "../adressesPool";
import inputSelection from "./inputsSingleTransaction";
import outputCreation from "./outputsSingleTransaction";
import sjcl from "../../../../sjcl";

//Not using these variables
/*
    var version = "01000000";
    var input_count;  //determines how many inputs (UTXO's) to include
    var input;        // one or more UTXO's as input, multiple variables
    var output_count; //determines how many outputs (STXO's) to create
    var output;       // one or more STXO's as output, multiple variables
    var locktime = "00000000"; // sets a minimum block height or unix time
    that the transaction can be included in
    */

//Adress structure:
//    [ user, $$$ , parent_block]

// create a JSON object for a single transaction including hash
function singleTransaction(sender, receiver, adressSender, block_height) {
  var fee =
    Math.trunc(0.00001 * Math.floor(Math.random() * 100) * 100000) / 100000; //how many addresses (UTXOs) are included in this transaction? add that into consideration when determining fees.
  var amount_sent = parseFloat(adressSender[1]); //all of the $ in this address - UTXO
  var amount_received = randomAmount(adressSender); //get a random amount to be paid
  var sender_leftover = amount_sent - amount_received;

  var transaction =
    "{ transaction_data: { UTXO: " +
    adressSender +
    ", owner_UTXO: " +
    sender +
    ", receiver: " +
    receiver +
    ", sender_leftover: " +
    sender_leftover +
    ", fee: " +
    fee +
    ", amount_sent: " +
    amount_sent +
    ", amount_received: " +
    amount_received +
    ", block_height: " +
    block_height +
    "} }";
  var bitHash = sjcl.hash.sha256.hash(transaction);
  var transactionHash = sjcl.codec.hex.fromBits(bitHash);

  //addressPool[user,$$$,parent_block]
  var transactionJSON = {
    hash: transactionHash,
    transaction_data: {
      UTXO: adressSender,
      owner_UTXO: adressSender[0],
      receiver: receiver,
      sender_leftover: sender_leftover,
      fee: fee,
      amount_sent: amount_sent,
      amount_received: amount_received,
    },
  };
  return transactionJSON;
}

function randomAmount(adressSender) {
  var balance = adressSender[1];
  var percent = Math.trunc(Math.random() * 100) / 100;
  var amount = Math.trunc(balance * percent * 100) / 100;
  return amount;
}

export default singleTransaction;
