const sjcl = require("../../../../sjcl");
const { UTXO_Pool } = require("../UTXO_Pool");
const { walletArr } = require("../../wallet");
const {
  createAddress,
  createPublicPrivateKey,
} = require("../../testValidation");

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
  senderWallet,
  receiverWallet,
  addressSender,
  UTXO_Sender,
  block_height,
  users
) {
  //delete selected UTXO from UTXO_pool
  var utxoPos = UTXO_Pool.indexOf(UTXO_Sender);
  UTXO_Pool.splice(utxoPos, 1);

  //delete adress from wallet
  var walletSenderPos = users.indexOf(senderWallet);
  var addSenderPos = walletArr[walletSenderPos][3].indexOf(addressSender);
  walletArr[walletSenderPos][3].splice(addSenderPos, 1);

  //create a fee for this transaction
  var fee =
    Math.trunc(0.00001 * Math.floor(Math.random() * 100) * 100000) / 100000; //TO BE DYNAMIC
  var amount_sent = parseFloat(UTXO_Sender[1]); //all of the $ in this address - UTXO
  var amount_received = randomAmount(UTXO_Sender); //get a random amount to be paid
  var sender_leftover = amount_sent - amount_received - fee; //compute the leftover currency from this TX

  if (sender_leftover != 0) {
    // sender leftover new address
    var out_sender_address = createAddressInfo(
      senderWallet,
      sender_leftover,
      block_height,
      users
    );
  }

  //address receiver
  var out_receiver_address = createAddressInfo(
    receiverWallet,
    amount_received,
    block_height,
    users
  );

  //create a transaction JSON object string to be hashed
  var transaction =
    "{ transaction_data: { UTXO: " +
    addressSender +
    ", owner_UTXO: " +
    senderWallet +
    ", amount_sent: " +
    amount_received +
    ", receiver: " +
    receiverWallet +
    ", amount_received: " +
    amount_received +
    ", receiver_address: " +
    out_receiver_address +
    ", sender_leftover: " +
    sender_leftover +
    ", sender_leftover_address: " +
    out_sender_address +
    ", fee: " +
    fee +
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
      UTXO: addressSender, //address: [user, currency, parent_block] represents UTXO
      owner_UTXO: senderWallet, //user sending $
      amount_sent: amount_sent, //full amount of UTXO (before transaction)
      receiver: receiverWallet, //user receiving $
      amount_received: amount_received, //amount received from transaction
      receiver_address: out_receiver_address, //adress of the new UTXO tio the receiver
      sender_leftover: sender_leftover, //remaining $ after transaction and fee
      sender_leftover_address: out_sender_address,
      fee: fee, //random fee to be dynamic
      block_height: block_height,
    },
  };
  return transactionJSON;
}

//random number function ranging from .00001 to .0009 to simulate fees
const randomAmount = (adressSender) => {
  var balance = adressSender[1];
  var percent = Math.trunc(Math.random() * 100) / 100;
  var amount = Math.trunc(balance * percent * 100) / 100;
  return amount;
};

const createAddressInfo = (wallet, amount, weight, users) => {
  var keys = createPublicPrivateKey();
  var address = createAddress(keys[2]);
  var walletPos = users.indexOf(wallet);
  walletArr[walletPos][3].push(address); // add adress to wallet
  var newUTXO = [address, amount, weight]; // create new UTXO
  UTXO_Pool.push(newUTXO); //add UTXO to pool
  return address;
};

module.exports = singleTransaction;
