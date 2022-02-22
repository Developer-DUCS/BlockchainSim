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
  var coinInputIfo = selectAmount2Spend(UTXO_Sender);
  var fee = coinInputIfo[0];
  var amount_sent = coinInputIfo[1];
  if (amount_sent == "undefined") console.log("   Line 42: amount_sent: ", amount_sent)
  var sender_leftover = coinInputIfo[2];
  var selectedUTXO = coinInputIfo[3];

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
    amount_sent,
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
    amount_sent +
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
      amount_received: amount_sent, //amount received from transaction
      receiver_address: out_receiver_address, //adress of the new UTXO tio the receiver
      sender_leftover: sender_leftover, //remaining $ after transaction and fee
      sender_leftover_address: out_sender_address,
      fee: fee, //random fee to be dynamic
      block_height: block_height,
    },
  };

  //if (addressesSender.length > 1) console.log(transactionJSON);
  return transactionJSON;
}

// create an address given a wallet, amount of coin, weight of the block and a list of wallets
const createAddressInfo = (wallet, amount, weight, users) => {
  var keys = createPublicPrivateKey();
  var address = createAddress(keys[2]);
  var walletPos = users.indexOf(wallet);
  walletArr[walletPos][3].push(address); // add adress to wallet
  //console.log(typeof(amount));
  if (typeof(amount) != "number" ) console.log("    Line 125: Invalid transaction here, AMOUNT:", amount)
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
    var total2Spend = UTXO_Sender[0][1] - fee;
    var amount_sent = Math.round( ( (Math.random() * total2Spend) + Number.EPSILON ) * 100000 ) / 100000 // round to 5 decimals
    sender_leftover = Math.round( ( (total2Spend - amount_sent) + Number.EPSILON ) * 100000 ) / 100000 // round to 5 decimals
    selectedUTXO = UTXO_Sender;
  }
  //more than one UTXO input
  else {
    console.log("   Line 169: more than one input");
    //select amount to spend
    var total = 0;
    for (var i = 1; i < UTXO_Sender.length - 1; i++) {
      total = total + UTXO_Sender[i][1];
    }
    var left = Math.round( ( (Math.random() * total) + Number.EPSILON ) * 100000 ) / 100000 // round to 5 decimals
    var amount_sent = left + UTXO_Sender[0][1];

    var selectedUTXO = [];
    selectedUTXO.push(UTXO_Sender[0]);
    var i = 1;
    //while (left > 0 && left - UTXO_Sender[i][1] < 0)
    console.log("   Line 182: amount_sent: ", amount_sent);
    while (left > 0 && i < UTXO_Sender.length ) {
      // POSSIBLE ERROR HERE
      if( (left - UTXO_Sender[i][0]) > 0){
        selectedUTXO.push(UTXO_Sender[i]);
        left = left - UTXO_Sender[i][1];
        console.log("   Line 186, Getting inputs: ", UTXO_Sender[i], left);
      }
      i = i+1;
    }
    sender_leftover = left; //leftover currency from this TX
    console.log("   Line 188: UTXOS selected: ", selectedUTXO.length, sender_leftover);

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
  //console.log("Line 190: sender_leftover: ", sender_leftover)

  return [fee, amount_sent, sender_leftover, selectedUTXO];
};

module.exports = singleTransaction;
