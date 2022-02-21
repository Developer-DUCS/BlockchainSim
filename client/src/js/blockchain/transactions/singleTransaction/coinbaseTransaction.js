const sjcl = require("../../../../sjcl");
const {
  createAddress,
  createPublicPrivateKey,
} = require("../../testValidation");
const { walletArr } = require("../../wallet");
const { UTXO_Pool } = require("./../UTXO_Pool");

/*
    --> BasecoinTransaction.JS FILE

    --> INPUTS:
      - miner: person who mined the code and it is receiving the reward + fees
      - fee: fees from the other transactions in the block
      - block_heigth: the height of the block 

    --> OUTPUTS:
      - coinbaseJSON: a single transaction as a JSON object

    *CONNECTIONS*:
      - File called from transactions.js (createTransactions())
      - File calls: 
        * sjcl() (sjcl.js) -->  used to create hashes and convert to hexadecimal
*/

// TO DO: Add fees
//      : Make scriptSig, scriptLength, scriptPubKey dynamic

function coinbaseTransaction(
  users,
  minerWallet,
  fee,
  block_height,
  subsidy,
  halvings,
  totalCoin
) {
  if (block_height / halvings >= 1) {
    subsidy = subsidy / 2 ** Math.floor(block_height / halvings);
  }

  totalCoin = totalCoin + subsidy;

  var amount_sent = fee + subsidy; // calculate amount the miner is receiving

  var newAddress = createAddressInfo(
    minerWallet,
    amount_sent,
    block_height,
    users
  );

  var coinbase =
    '{ transaction_data: { UTXO: "0000000000000000000000000000000000000000000000000000000000000000", owner_UTXO: "0000000000000000000000000000000000000000000000000000000000000000", receiver: ' +
    newAddress +
    ", sender_leftover: 0, fee: " +
    fee +
    ", amount_sent: " +
    subsidy +
    " , amount_received: " +
    subsidy +
    ", block_height: " +
    block_height +
    "} }";

  //hash the info
  var bitHash = sjcl.hash.sha256.hash(coinbase);
  var transactionHash = sjcl.codec.hex.fromBits(bitHash);

  //create json object
  var coinbaseJSON = {
    hash: transactionHash,
    transaction_data: {
      UTXO: "000000000000000000000000000000000000000000000000000000000000000000000000000000",
      owner_UTXO:
        "0000000000000000000000000000000000000000000000000000000000000000",
      owner_UTXO:
        "00000000000000000000000000000000000000000000000000000000000000000",
      receiver: newAddress, //adress
      sender_leftover: 0,
      sender_leftover_address:
        "0000000000000000000000000000000000000000000000000000000000000000",
      fee: fee,
      amount_sent: subsidy, //to hash first?
      amount_received: amount_sent,
      block_height: block_height,
    },
  };
  return [coinbaseJSON, totalCoin];
}

function createAddressInfo(wallet, amount, weight, users) {
  var keys = createPublicPrivateKey();
  var address = createAddress(keys[2]);
  var walletPos = users.indexOf(wallet);
  walletArr[walletPos][3].push(address); // add adress to wallet
  var newUTXO = [address, amount, weight]; // create new UTXO
  UTXO_Pool.push(newUTXO); //add UTXO to pool
  return address;
}

module.exports = coinbaseTransaction;
