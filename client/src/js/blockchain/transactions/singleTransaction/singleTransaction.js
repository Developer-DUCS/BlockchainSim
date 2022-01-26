import { getAdress } from "../UTXO_Pool";
import sjcl from "../../../../sjcl";

/*
    --> SINGLETRANSACTION.JS FILE

    --> INPUTS:
      - sender: user who the transaction comes from
      - receiver: user who the transaction goes to
      - adressSender: address of sender in an array containing [user, currency, parent_block]
      - b_heigtht: height of the block the transaction is in

    --> OUTPUTS:
      - singleTransaction: a single transaction as a JSON object

    *CONNECTIONS*:
      - File called from transactions.js (createTransactions())
      - File calls: 
        * getAdress() (adressesPool.js) --> get address from addressesPool
        * sjcl() (sjcl.js) -->  used to create hashes and convert to hexadecimal
*/

// create a JSON object for a single transaction including hash
function singleTransaction(
  sender,
  receiver,
  adressSender,
  block_height,
  wallets
) {
  //create a fee for this transaction
  var fee =
    Math.trunc(0.00001 * Math.floor(Math.random() * 100) * 100000) / 100000; //TO BE DYNAMIC
  var amount_sent = parseFloat(adressSender[1]); //all of the $ in this address - UTXO
  var amount_received = randomAmount(adressSender); //get a random amount to be paid
  var sender_leftover = amount_sent - amount_received - fee; //compute the leftover currency from this TX

  //create a transaction JSON object string to be hashed
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
  var bitHash = sjcl.hash.sha256.hash(transaction); //convert transaction string to sha256 hash
  var transactionHash = sjcl.codec.hex.fromBits(bitHash); //convert hash to hexadecimal

  //create transaction JSON object
  var transactionJSON = {
    hash: transactionHash, //hash created above
    //all the data we are using to create transactions
    transaction_data: {
      UTXO: adressSender, //address: [user, currency, parent_block] represents UTXO
      owner_UTXO: adressSender[0], //user sending $
      receiver: receiver, //user receiving $
      sender_leftover: sender_leftover, //remaining $ after transaction and fee
      fee: fee, //random fee to be dynamic
      amount_sent: amount_sent, //full amount of UTXO (before transaction)
      amount_received: amount_received, //amount received from transaction
    },
  };
  return transactionJSON;
}

//random number function ranging from .00001 to .0009 to simulate fees
function randomAmount(adressSender) {
  var balance = adressSender[1];
  var percent = Math.trunc(Math.random() * 100) / 100;
  var amount = Math.trunc(balance * percent * 100) / 100;
  return amount;
}

export default singleTransaction;
