const sjcl = require("../../../../sjcl");
const { UTXO_Pool } = require("../UTXO_Pool");
const { walletArr } = require("../../wallet");
const {
  createAddress,
  createPublicPrivateKey,
} = require("../../testValidation");

const NUMBER_DECIMALS = 100000;
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
  walletArr[wallPos][4] -= amount_sent; // update wallet amount
  var adrsSender = [];
  for (var i = 0; i < selectedUTXO.length; i++) {
    adrsSender.push(selectedUTXO[i][0]);
    //addresesSender.push[selectedUTXO]

    var UTXOpos = UTXO_Pool.indexOf(selectedUTXO[i][0]);
    UTXO_Pool.splice(UTXOpos, 1);
    var adrPos = walletArr[wallPos][3].indexOf(selectedUTXO[i][0]);
    walletArr[wallPos][3].splice(adrPos, 1);
  }
  if(adrsSender[0].length == 3) console.log("adresses: ",adrsSender,"selected UTXO: ", selectedUTXO);

  if (typeof sender_leftover != undefined) {
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
    adrsSender +
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
    hash: transactionHash, // hash created above
    transaction_data: {
      sender_wallet: senderWallet[0],
      addresses_input_UTXO: adrsSender, // array with addreses [khbvusvues,bidcyvweuvfyc,kshcbiwvyie]
      amount_sent: amount_sent, // full amount of UTXO (before transaction)
      amount_received: amount_received, // amount received from transaction
      receiver_address: out_receiver_address, // adress of the new UTXO tio the receiver
      receiver_wallet: receiverWallet,
      sender_leftover: sender_leftover, // remaining $ after transaction and fee
      sender_leftover_address: out_sender_address,
      fee: fee, // random fee to be dynamic
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
  walletArr[walletPos][4] += amount; // update wallet amount
  walletArr[walletPos][3].push(address); // add adress to wallet
  var newUTXO = [address, amount, weight]; // create new UTXO
  UTXO_Pool.push(newUTXO); //add UTXO to pool
  return address;
};

// select the amount of coin to spend in the transactions and the UTXOs to use
const selectAmount2Spend = (UTXO_Sender) => {
  // calculate how much fee per input is chosen
  var feePerInput =
    Math.trunc(0.00001 * Math.floor(Math.random() * 100) * NUMBER_DECIMALS) /
    NUMBER_DECIMALS; //TO BE DYNAMIC
  feePerInput =
    Math.round((feePerInput + Number.EPSILON) * NUMBER_DECIMALS) /
    NUMBER_DECIMALS; // round to 5 decimals

  // CASE 1: ony one possible input
  if (UTXO_Sender.length == 1) {
    var fee = feePerInput;
    var amount_sent = UTXO_Sender[0][1];
    var amount_received =
      Math.round(
        (Math.random() * amount_sent - fee + Number.EPSILON) * NUMBER_DECIMALS
      ) / NUMBER_DECIMALS;
    var sender_leftover =
      Math.round(
        (amount_sent - amount_received + Number.EPSILON) * NUMBER_DECIMALS
      ) / NUMBER_DECIMALS;
    var selectedUTXO = UTXO_Sender;
  }
  // CASE 2: more than one UTXO input possible
  else {
    // 1) select # UTXOs to spend
    var numaddresses2use = Math.floor(
      Math.random() * (UTXO_Sender.length - 1) + 1
    );
    // 2) calculate fees
    var fee =
      Math.round(
        (feePerInput * numaddresses2use + Number.EPSILON) * NUMBER_DECIMALS
      ) / NUMBER_DECIMALS;
    // 3) calculate total possible to be spent
    var total = 0;
    var coinLastUTXO;
    for (var i = 0; i < numaddresses2use; i++) {
      i == numaddresses2use - 1
        ? (coinLastUTXO = UTXO_Sender[i][1])
        : (total = total + UTXO_Sender[i][1]);
    }
    // 4) select random amount to spend
    var amount2spendLast =
      Math.round(
        (Math.random() * coinLastUTXO + Number.EPSILON) * NUMBER_DECIMALS
      ) / NUMBER_DECIMALS; // round to 5 decimals
    var amount_received =
      Math.round(
        (total + amount2spendLast + Number.EPSILON) * NUMBER_DECIMALS
      ) / NUMBER_DECIMALS;
    var amount_sent =
      Math.round((total + coinLastUTXO + Number.EPSILON) * NUMBER_DECIMALS) /
      NUMBER_DECIMALS;
    var sender_leftover =
      Math.round(
        (coinLastUTXO - amount2spendLast - fee + Number.EPSILON) *
          NUMBER_DECIMALS
      ) / NUMBER_DECIMALS;
    // 5) get UTXOs to be used
    var selectedUTXO = [];
    for (var i = 0; i < numaddresses2use; i++)
      selectedUTXO.push(UTXO_Sender[i]);
  }

  return [fee, amount_sent, sender_leftover, selectedUTXO, amount_received];
};

module.exports = singleTransaction;
