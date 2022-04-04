const sjcl = require("../../../sjcl");
const {
  createAddress,
  createPublicPrivateKey,
} = require("../../testValidation");
//const { walletArr } = require("../../wallet");
//const { UTXO_Pool } = require("./../UTXO_Pool");

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
  totalCoin,
  walletArr,
  UTXO_Pool
) {
  if (block_height / halvings >= 1) {
    subsidy = subsidy / 2 ** Math.floor(block_height / halvings);
  }

  totalCoin = totalCoin + subsidy;

  var amount_sent = fee + subsidy; // calculate amount the miner is receiving

  // Update miner wallet
  walletArr.map((wallet) => {
    if (wallet[0] == minerWallet) {
      wallet[4] = wallet[4] + amount_sent;
    }
  });

  var newAddressInfo = createAddressInfo(
    minerWallet,
    amount_sent,
    block_height,
    users,
    walletArr,
    UTXO_Pool
  );
  var newAddress = newAddressInfo[0];
  walletArr = newAddressInfo[1];
  UTXO_Pool = newAddressInfo[2];

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
      sender_wallet:
        "000000000000000000000000000000000000000000000000000000000000000000000000000000",
      addresses_input_UTXO: [
        "000000000000000000000000000000000000000000000000000000000000000000000000000000",
      ], //array with addreses [khbvusvues,bidcyvweuvfyc,kshcbiwvyie]
      amount_sent: subsidy, //full amount of UTXO (before transaction)
      amount_received: amount_sent, //amount received from transaction
      receiver_address: newAddress, //adress of the new UTXO tio the receiver
      receiver_wallet: minerWallet,
      sender_leftover: "0", //remaining $ after transaction and fee
      sender_leftover_address:
        "000000000000000000000000000000000000000000000000000000000000000000000000000000",
      fee: fee, //random fee to be dynamic
      block_height: block_height,
    },
  };
  return [coinbaseJSON, totalCoin, walletArr, UTXO_Pool];
}

function createAddressInfo(
  wallet,
  amount,
  weight,
  users,
  walletArr,
  UTXO_Pool
) {
  var keys = createPublicPrivateKey();
  var address = createAddress(keys[2]);
  var walletPos = users.indexOf(wallet);
  walletArr[walletPos][3].push(address); // add adress to wallet
  var newLedgerEle = ["received", address, amount, weight];
  walletArr[walletPos][5].push(newLedgerEle);
  var newUTXO = [address, amount, weight]; // create new UTXO
  UTXO_Pool.push(newUTXO); //add UTXO to pool
  return [address, walletArr, UTXO_Pool];
}
//

module.exports = coinbaseTransaction;
