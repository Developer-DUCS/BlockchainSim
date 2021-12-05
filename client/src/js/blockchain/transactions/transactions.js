import inputSelection from "./singleTransaction/inputsSingleTransaction";
import outputCreation from "./singleTransaction/outputsSingleTransaction";
import singleTransaction from "./singleTransaction/singleTransaction";
import chooseMiner from "../block/miningPool";
import coinbaseTransaction from "./singleTransaction/coinbaseTransaction";
import createAdressPoolHeader, { adressesPool } from "./adressesPool";

// https://learnmeabitcoin.com/technical/transaction-data
// good resource on transaction data

// create ALL transactions for an individual block
const createTransactions = (
  miner,
  numtransactions,
  block_height,
  miningPool
) => {
  // list of all transactions
  var transactions = [];
  var users = miningPool; // possible users

  // TO DO:
  //  1. make transaction_count dynamic
  //  2. create parameters for transactions
  //  3. create random transactions
  //  4. handle inputs and outputs for transactions (?)

  if (block_height > 99) {
    var sender;
    var receiver;
    for (let i = 0; i < numtransactions; i++) {
      sender = chooseMiner(miningPool);
      //TODO: check if person has valid money

      receiver = chooseMiner(miningPool);
      //console.log(sender, receiver);
      //TODO: check reciver is not the same as sender

      var transaction = singleTransaction(sender, receiver);
      transactions.push(transaction);
    }

    //create coin base transaction + fees
    //push it to array but in first position
  } else {
    // <100 block height
    // coinbase transaction with no fees
    //TODO: assign basecoin transaction to miner before pushing it
    var coinbaseTX = coinbaseTransaction(miner, 0, block_height);

    // add coinbase transaction to block transactions
    transactions.push(coinbaseTX);

    // create + add adress it to adress pool
    var baseAddress = [
      coinbaseTX.transaction_data.receiver,
      coinbaseTX.transaction_data.amount_received,
      block_height,
    ];
    var pos = users.findIndex((pos) => {
      return pos == baseAddress[0];
    });
    adressesPool[pos].push(baseAddress);
  }

  return transactions;
};

export default createTransactions;

//TO DO:
//      1.) Create a pool of transactions to be included
//
//      2.) Determine how to store varying amounts of inputs and outputs
//          - (UTXO's and STXO's)
//      4/) Pass finished transactions to merkle tree to be hashed
