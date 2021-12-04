import inputSelection from "./singleTransaction/inputsSingleTransaction";
import outputCreation from "./singleTransaction/outputsSingleTransaction";
import singleTransaction from "./singleTransaction/singleTransaction";
import chooseMiner from "../block/miningPool";
import coinbaseTransaction from "./singleTransaction/coinbaseTransaction";

// https://learnmeabitcoin.com/technical/transaction-data
// good resource on transaction data

// create ALL transactions for an individual block
const createTransactions = (miner, numtransactions, block_height) => {
  // list of all transactions
  var transactions = [];

  // TO DO:
  //  1. make transaction_count dynamic
  //  2. create parameters for transactions
  //  3. create random transactions
  //  4. handle inputs and outputs for transactions (?)

  if (block_height > 99) {
    var sender;
    var receiver;
    for (let i = 0; i < numtransactions; i++) {
      sender = chooseMiner();
      //TODO: check if person has valid money

      receiver = chooseMiner();
      console.log(sender, receiver);
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
    var coinbaseTX = coinbaseTransaction(miner);
    // add coinbase transaction
    transactions.push(coinbaseTX);
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
