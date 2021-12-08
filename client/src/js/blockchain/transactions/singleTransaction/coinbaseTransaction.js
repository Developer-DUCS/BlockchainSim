// generate a basecoin transaction of 50 bitcoin
// TO DO: Add fees
//      : Make scriptSig, scriptLength, scriptPubKey dynamic
import sjcl from "../../../../sjcl";

const BLOCK_REWARD = 50;

const coinbaseTransaction = (miner, fee, block_height) => {
  var coinbase =
    '{ transaction_data: { UTXO: "0000000000000000000000000000000000000000000000000000000000000000", owner_UTXO: "0000000000000000000000000000000000000000000000000000000000000000", receiver: ' +
    miner +
    ", sender_leftover: 0, fee: " +
    fee +
    ", amount_sent: 50, amount_received: 50, block_height: " +
    block_height +
    "} }";
  var bitHash = sjcl.hash.sha256.hash(coinbase);
  var transactionHash = sjcl.codec.hex.fromBits(bitHash);
  var amount_sent = fee + BLOCK_REWARD;

  var coinbaseJSON = {
    hash: transactionHash,
    transaction_data: {
      UTXO: "0000000000000000000000000000000000000000000000000000000000000000",
      owner_UTXO:
        "0000000000000000000000000000000000000000000000000000000000000000",
      receiver: miner,
      sender_leftover: 0,
      fee: 0,
      amount_sent: BLOCK_REWARD,
      amount_received: amount_sent,
    },
  };
  return coinbaseJSON;
};

export default coinbaseTransaction;
