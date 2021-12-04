// generate a basecoin transaction of 50 bitcoin
// TO DO: Add fees
//      : Make scriptSig, scriptLength, scriptPubKey dynamic
import sjcl from "../../../../sjcl";
const coinbaseTransaction = (miner) => {
  /*
  var coinbase = "";
  // we're copying https://en.bitcoin.it/wiki/Genesis_block
  // the original basecoin transaction

  var version = "01000000";
  var inputCount = "01";
  // all zeroes because no input
  var TXID = "0000000000000000000000000000000000000000000000000000000000000000";
  var VOUT = "FFFFFFFF";
  var scriptLength = "4D";
  //script sig can be anything so we have a ~secret message~
  // The Times 03/Jan/2009 Chancellor on brink of second bailout for banks
  var scriptSig =
    "04FFFF001D0104455468652054696D65732030332F4A616E2F32303039204368616E63656C6C6F72206F6E206272696E6B206F66207365636F6E64206261696C6F757420666F722062616E6B73";
  var sequence = "FFFFFFFF";
  // build input
  var input = coinbase.concat(
    version,
    inputCount,
    TXID,
    VOUT,
    scriptLength,
    scriptSig,
    sequence
  );
  // 1 output
  var outputCount = "01";
  // 50 btc
  var value = "00F2052A01000000";
  var scriptPubKey =
    "4104678AFDB0FE5548271967F1A67130B7105CD6A828E03909A67962E0EA1F61DEB649F6BC3F4CEF38C4F35504E51EC112DE5C384DF7BA0B8D578A4C702B6BF11D5FAC";
  var locktime = "00000000";
  var output = coinbase.concat(outputCount, value, scriptPubKey, locktime);

  coinbase = coinbase.concat(input, output);
  */
  var tempCoinbase =
    '{ transaction_data: { UTXO: "0000000000000000000000000000000000000000000000000000000000000000", owner_UTXO: "0000000000000000000000000000000000000000000000000000000000000000", receiver: miner, sender_leftover: "0", fee: "0", amount_sent: "50",} }';
  var bitHash = sjcl.hash.sha256.hash(tempCoinbase);
  var transactionHash = sjcl.codec.hex.fromBits(bitHash);

  var tempCoinbaseJSON = {
    hash: transactionHash,
    transaction_data: {
      UTXO: "0000000000000000000000000000000000000000000000000000000000000000",
      owner_UTXO:
        "0000000000000000000000000000000000000000000000000000000000000000",
      receiver: miner,
      sender_leftover: "0",
      fee: "0",
      amount_sent: "50",
    },
  };
  return tempCoinbaseJSON;
};

export default coinbaseTransaction;
