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
  UTXO_Sender,
  block_height,
  users
) {
  var senderWalletId = senderWallet[0];

  // select amount and UTXOs to spend
  var coinInputInfo = selectAmount2Spend(UTXO_Sender);
  var fee = coinInputInfo[0];
  var amount_sent = coinInputInfo[1];
  var sender_leftover = coinInputInfo[2];
  var selectedUTXO = coinInputInfo[3];
  var amount_received = coinInputInfo[4];

  // delete UTXOs that are going to be spent
  var wallPos = users.indexOf(senderWalletId);
  var addressesSender = [];
  for (var i = 0; i < selectedUTXO.length; i++) {
    addressesSender.push(selectedUTXO[i][0]);
    var UTXOpos = UTXO_Pool.indexOf(selectedUTXO[i]);
    UTXO_Pool.splice(UTXOpos, 1);
    var adrPos = walletArr[wallPos][3].indexOf(selectedUTXO[i][0]);
    walletArr[wallPos][3].splice(adrPos, 1);
  }

  if (typeof(sender_leftover) != undefined) {
    // sender leftover new address
    var out_sender_address = createAddressInfo(
      senderWalletId,
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
    "{ transaction_data: { addresses_input_UTXO: " +
    addressesSender +
    ", owner_UTXO: " +
    senderWalletId +
    ", amount_sent: " +
    amount_sent +
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
    transaction_data: {
      addresses_input_UTXO: addressesSender, //array with addreses [khbvusvues,bidcyvweuvfyc,kshcbiwvyie]
      amount_sent: amount_sent, //full amount of UTXO (before transaction)
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

// create an address given a wallet, amount of coin, weight of the block and a list of wallets
const createAddressInfo = (wallet, amount, weight, users) => {
  var keys = createPublicPrivateKey();
  var address = createAddress(keys[2]);
  var walletPos = users.indexOf(wallet);
  walletArr[walletPos][3].push(address); // add adress to wallet
  var newUTXO = [address, amount, weight]; // create new UTXO
  UTXO_Pool.push(newUTXO); //add UTXO to pool
  return address;
};

// select the amount of coin to spend in the transactions and the UTXOs to use
const selectAmount2Spend = (UTXO_Sender) => {
  var sender_leftover = 0;
  var feePerInput =
    Math.trunc(0.00001 * Math.floor(Math.random() * 100) * 100000) / 100000; //TO BE DYNAMIC
  feePerInput = Math.round( ( feePerInput + Number.EPSILON ) * 100000 ) / 100000 // round to 5 decimals

  if (UTXO_Sender.length == 1) {
    var fee = feePerInput;
    var amount_sent = UTXO_Sender[0][1] - fee;
    var total2Spend = Math.round( ( (Math.random() * amount_sent) + Number.EPSILON ) * 100000 ) / 100000 // round to 5 decimals
    sender_leftover = Math.round( ( (amount_sent - total2Spend) + Number.EPSILON ) * 100000 ) / 100000 // round to 5 decimals
    selectedUTXO = UTXO_Sender;
    received = total2Spend;
  }
  //more than one UTXO input
  else {
    //select amount to spend not counting first UTXO
    var total = 0;
    for (var i = 1; i < UTXO_Sender.length - 1; i++) {
      total = total + UTXO_Sender[i][1];
    }
    var left = Math.round( ( (Math.random() * total) + Number.EPSILON ) * 100000 ) / 100000 // round to 5 decimals

    //NOT SURE IF AMOUNT SENT IS CORRECT
    var amount_sent = Math.round( ( (left + UTXO_Sender[0][1]) + Number.EPSILON ) * 100000 ) / 100000 // round to 5 decimals

    //select UTXOs to use
    var selectedUTXO = [];
    selectedUTXO.push(UTXO_Sender[0]);
    var received = UTXO_Sender[0][1];
    var i = 1;

    while (left > 0 && i < UTXO_Sender.length ) {
      if( (left - UTXO_Sender[i][1]) > 0){ // Make sure the leftover does not turn negative 
        selectedUTXO.push(UTXO_Sender[i]); // add UTXOs to selected list
        left = left - UTXO_Sender[i][1]; // substract from total left
        received = received + UTXO_Sender[i][1]; // add to received coin
      }
      i = i+1; //pass to next UTXO
    }
    if(selectedUTXO.length > 1) console.log("check here");
    received = Math.round( ( received + Number.EPSILON ) * 100000 ) / 100000 //leftover currency from this TX
    sender_leftover = Math.round( ( left + Number.EPSILON ) * 100000 ) / 100000 //leftover currency from this TX
    if((sender_leftover+received) != amount_sent) console.log("SOMETHING IS NOT ROUNDED")

    // create a fee for this transaction
    var fee = feePerInput * UTXO_Sender.length;

    //select amount to spend
  var total = 0;
  for (var i = 0; i < selectedUTXO.length; i++) {
    total = total + selectedUTXO
    [i][1];
  }
  var total2Spend = total - fee;
  var amount_sent = Math.random() * total2Spend;
  amount_sent = Math.round( ( amount_sent + Number.EPSILON ) * 100000 ) / 100000 // round to 5 decimals
  }

  return [fee, amount_sent, sender_leftover, selectedUTXO, received];
};

module.exports = singleTransaction;
