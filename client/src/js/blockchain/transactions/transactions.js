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
  var transactions = []; // list of all transactions
  var users = miningPool; // possible users

  // TO DO:
  //  3. create random transactions
  //  4. handle inputs and outputs for transactions (?)

  //more than only basecoin transaction is possible
  if (block_height > 99) {
    var receiver;
    var fees = 0;

    //create transactions
    for (let i = 0; i < numtransactions; i++) {
      //find a valid sender with valid money
      var senderInfo = selectSender(miningPool, users, block_height);

      if (senderInfo != undefined) {
        var sender = senderInfo[0];
        var adressSender = senderInfo[1];
        //delete selected adress from adresses pool
        var adressPos = adressesPool[senderInfo[2]].indexOf(adressSender);
        adressesPool[senderInfo[2]].splice(adressPos, 1);
        console.log(
          "sender found: ",
          sender,
          "for block: ",
          block_height,
          "with adress: ",
          adressSender
        );

        //select receiver diferent than sender
        receiver = chooseMiner(miningPool);
        while (receiver == sender) receiver = chooseMiner(miningPool);
        console.log(sender, receiver, block_height);

        //create transaction
        var transaction = singleTransaction(
          sender,
          receiver,
          adressSender,
          block_height
        );
        transactions.push(transaction);
      } else {
        //no more possible transactions
        return transactions;
      }
    }

    //create coin base transaction + fees
    //var coinbaseTX = coinbaseTransaction(miner, fees, block_height);
    //push it to array but in first position
  } else {
    // <100 block height --> coinbase transaction with no fees
    var coinbaseTX = coinbaseTransaction(miner, 0, block_height);
    console.log(
      "BaseCoin transaction for block ",
      block_height,
      ": ",
      coinbaseTX
    );
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
    usersChecked.push(sender); //add current sender to checked users

    // check if there is any valid adreess
    var validHeigth = block_height - MINIMUM_DEPTH;
    var senderInfo;

    for (let adressPos in adressesPool[senderPos]) {
      var adress = adressesPool[senderPos][adressPos];
      if (adress[2] <= validHeigth) {
        //console.log("FOUND", counter2);
        found = true;
        senderInfo = [sender, adress, senderPos]; // [laura, [laura, 50BTC, block 3], position 15]
        return senderInfo;
      }
    }
    if (!found) {
      senderPos + 1 >= miningPool.length
        ? (senderPos = senderPos + 1 - miningPool.length)
        : senderPos++;
      sender = miningPool[senderPos];
      //console.log("new sender", sender);
    }

    counter2++;
  }
  return senderInfo;
};

export default createTransactions;

//TO DO:
//      1.) Create a pool of transactions to be included
//
//      2.) Determine how to store varying amounts of inputs and outputs
//          - (UTXO's and STXO's)
//      4/) Pass finished transactions to merkle tree to be hashed
