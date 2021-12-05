import inputSelection from "./singleTransaction/inputsSingleTransaction";
import outputCreation from "./singleTransaction/outputsSingleTransaction";
import singleTransaction from "./singleTransaction/singleTransaction";
import chooseMiner from "../block/miningPool";
import coinbaseTransaction from "./singleTransaction/coinbaseTransaction";
import createAdressPoolHeader, { adressesPool } from "./adressesPool";

var MINIMUM_DEPTH = 100;

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
  //  3. create random transactions
  //  4. handle inputs and outputs for transactions (?)

  //more than only basecoin transaction is possible
  if (block_height > 99) {
    var receiver;
    console.log("miningPool:", miningPool);
    for (let i = 0; i < numtransactions; i++) {
      var sender = selectSender(miningPool, users, block_height);
      console.log("sender found: ", sender, "for block: ", block_height);
      //TODO: check if person has valid money
      receiver = chooseMiner(miningPool);
      console.log(sender, receiver, block_height);
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

const selectSender = (miningPool, users, block_height) => {
  var usersChecked = [];
  var found = false;
  var counter2 = 0;
  var sender = chooseMiner(miningPool); //select a random sender
  var senderPos = users.findIndex((pos) => {
    return pos == sender;
  });
  while (found == false && counter2 < 50) {
    console.log("checking for miner: ", sender, senderPos);
    console.log("users already checked: ", usersChecked, usersChecked.length);
    console.log("round:", counter2);

    usersChecked.push(sender); //add current sender to checked users
    // check if there is any valid adreess
    var validHeigth = block_height - MINIMUM_DEPTH;
    for (let adressPos in adressesPool[senderPos]) {
      console.log("new adress:", adressPos, adressesPool[senderPos][adressPos]);
      var adress = adressesPool[senderPos][adressPos];
      if (adress[2] <= validHeigth) {
        found = true;
        console.log("possible adress to use:", adress, sender);
      }
    }
    if (found) console.log("found");
    else {
      console.log("not found yet");
      senderPos + 1 >= miningPool.length
        ? (senderPos = senderPos + 1 - miningPool.length)
        : senderPos++;
      sender = miningPool[senderPos];
      console.log("new sender", sender);
    }

    counter2++;
  }
  return sender;
};

export default createTransactions;

//TO DO:
//      1.) Create a pool of transactions to be included
//
//      2.) Determine how to store varying amounts of inputs and outputs
//          - (UTXO's and STXO's)
//      4/) Pass finished transactions to merkle tree to be hashed
