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
import sjcl from "../../../../sjcl";

const coinbaseTransaction = (miner, fee, block_height, subsidy) => {
  let BLOCK_REWARD = subsidy;

  //create the object to hash
  var coinbase =
    '{ transaction_data: { UTXO: "0000000000000000000000000000000000000000000000000000000000000000", owner_UTXO: "0000000000000000000000000000000000000000000000000000000000000000", receiver: ' +
    miner +
    ", sender_leftover: 0, fee: " +
    fee +
    ", amount_sent: 50, amount_received: 50, block_height: " +
    block_height +
    "} }";

  //hash the info
  var bitHash = sjcl.hash.sha256.hash(coinbase);
  var transactionHash = sjcl.codec.hex.fromBits(bitHash);

  var amount_sent = fee + BLOCK_REWARD; // calculate amount teh miner is receiving

  //create json object
  var coinbaseJSON = {
    hash: transactionHash,
    transaction_data: {
      UTXO: "0000000000000000000000000000000000000000000000000000000000000000",
      owner_UTXO:
        "0000000000000000000000000000000000000000000000000000000000000000",
      receiver: miner,
      sender_leftover: 0,
      fee: fee,
      amount_sent: BLOCK_REWARD,
      amount_received: amount_sent,
    },
  };
  return coinbaseJSON;
};

export default coinbaseTransaction;
