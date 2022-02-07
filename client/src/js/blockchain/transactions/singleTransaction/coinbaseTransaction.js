import sjcl from "../../../../sjcl";
import createAddress, { createPublicPrivateKey } from "../../testValidation";
import { walletArr } from "../../wallet";
import { UTXO_Pool } from "./../UTXO_Pool";

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

function coinbaseTransaction(users, minerWallet, fee, block_height, subsidy) {
  let BLOCK_REWARD = subsidy;

  var amount_sent = fee + BLOCK_REWARD; // calculate amount the miner is receiving

  var newAddress = createAddressInfo(
    minerWallet,
    amount_sent,
    block_height,
    users
  );

  //create the object to hash
  var coinbase =
    '{ transaction_data: { UTXO: "0000000000000000000000000000000000000000000000000000000000000000", owner_UTXO: "0000000000000000000000000000000000000000000000000000000000000000", receiver: ' +
    newAddress +
    ", sender_leftover: 0, fee: " +
    fee +
    ", amount_sent:" +
    BLOCK_REWARD +
    ", amount_received:" +
    amount_sent +
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
      amount_sent: BLOCK_REWARD, //to hash first?
      amount_received: amount_sent,
      block_height: block_height,
    },
  };
  return coinbaseJSON;
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

export default coinbaseTransaction;
