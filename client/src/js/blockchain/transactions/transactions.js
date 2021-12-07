import singleTransaction from "./singleTransaction/singleTransaction";
import chooseMiner from "../block/miningPool";
import coinbaseTransaction from "./singleTransaction/coinbaseTransaction";
import { adressesPool } from "./adressesPool";

var MINIMUM_DEPTH = 100;

// create ALL transactions for an individual block
const createTransactions = (
  miner,
  numtransactions,
  block_height,
  miningPool
) => {
  var transactions = []; // list of all transactions
  var users = miningPool; // possible users

  //more than only basecoin transaction is possible
  if (block_height > 99 && !done) {
    var receiver;
    var fee = 0;
    var done = false;

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

        //select receiver diferent than sender
        receiver = chooseMiner(miningPool);
        while (receiver == sender) receiver = chooseMiner(miningPool);

        //create transaction
        var transaction = singleTransaction(
          sender,
          receiver,
          adressSender,
          block_height
        );

        //create adress
        var newAdress = [
          transaction.transaction_data.receiver,
          transaction.transaction_data.amount_received,
          block_height,
        ];

        fee = +transaction.transaction_data.fee;

        addAdress2Pool(newAdress, users);
        transactions.push(transaction);
      } else {
        //no more possible transactions
        done = true;
        //return transactions;
      }
    }

    //create coin base transaction + fees
    var coinbaseTX = coinbaseTransaction(miner, fee, block_height);
    var newAdress = [
      coinbaseTX.transaction_data.receiver,
      coinbaseTX.transaction_data.amount_received,
      block_height,
    ];

    addAdress2Pool(newAdress, users);
    transactions.unshift(coinbaseTX);
  } else {
    // <100 block height --> coinbase transaction with no fees
    var coinbaseTX = coinbaseTransaction(miner, 0, block_height);
    transactions.push(coinbaseTX);

    // create + add adress it to adress pool
    var baseAddress = [
      coinbaseTX.transaction_data.receiver,
      coinbaseTX.transaction_data.amount_received,
      block_height,
    ];

    addAdress2Pool(baseAddress, users);
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
    }

    counter2++;
  }
  return senderInfo;
};

//add adress to adresses pool
const addAdress2Pool = (adress, users) => {
  var pos = users.findIndex((pos) => {
    return pos == adress[0];
  });
  adressesPool[pos].push(adress);
};

export default createTransactions;
