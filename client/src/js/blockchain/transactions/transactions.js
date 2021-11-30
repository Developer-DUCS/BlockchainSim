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
    var coinbaseTX = coinbaseTransaction();
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

/*
posible miners:[1,2,3,4,5,6]
max number transaction = 10

users with currency:[]
users without currency:[1,2,3,4,5,6]
-----------------------------------
genesis block (0):
    - miner : 1
    - number transaction: 1 (only base coin)
    - transaction:{
        0: basecoin --> 50BTC to 1
    }
    - transaction reward: 50BTC

users with currency:[1]
users without currency:[2,3,4,5,6]
--------------------------------------
block 1:
    - miner: 3
    - transaction counter: 2 (base coin + 1)
    - transaction:{
        0: basecoin ---> 50BTC + fee to 3
        1: 1BTC from 1 to 4
    }
    - transaction reward: 50BTC
    - transaction fee reward: 0.000001BTC


users with currency:[1,3,4]
1: 48.999999 BTC
3: 50.000001 BTC
4: 1BTC
users without currency:[2,5,6]  
----------------------------------------------------------
block 2:
    - miner: 5
    - transaction counter: 5 (base coin + 1)
    - transaction:{
        0: basecoin ---> 50BTC + fee to 3
        1: 2BTC from 1 to 2
        2: 10BTC from 1 to 5
        3: 2BTC from 3 to 1
        4: 40BTC from 3 to 6
    }
    - transaction reward: 50BTC
    - transaction fee reward: 0.000004BTC

users with currency:[1,2,3,4,5,6]
1: 38.999997 BTC
2: 2BTC
3: 7.999999 BTC
4: 1BTC
5: 60.000003BTC
6: 40BTC
users without currency:[]
*/
