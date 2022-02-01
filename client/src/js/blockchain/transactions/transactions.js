import singleTransaction from "./singleTransaction/singleTransaction";
import chooseMiner from "../block/miningPool";
import coinbaseTransaction from "./singleTransaction/coinbaseTransaction";
import { UTXO_Pool } from "./UTXO_Pool";

/*
    --> TRANSACTIONS.JS FILE

    --> INPUTS:
      - miner: person who mined the block
      - numtransaction: maximun number of transactions to be create for a block
      - b_heigth: heigth of the block parent
      - miningPool: pool of miners created previously at the beggining of the simulation

    --> OUTPUTS:
      - transactions: array with the transactions to add to the block

    *CONNECTIONS*:
      - File called from block.js (blockCreator())
      - File calls: 
        * chooseMiner() (miningPool.js) --> choose a user from already created pool of miners
        * coinbaseTransaction() (coinbaseTransaction.js) --> create coin base transaction
        * singleTransaction() (singleTransaction.js) --> create a transaction between two users given an array of adresses
        * adressesPool (adressesPool.js) --> dynamic pool with all non spended UTXOs
        * 
        * 
        * //TODO: right now we are getting UTXO, implement adress and get adress (line 129)
        * //TODO: clean up code?
*/

var MINIMUM_DEPTH = 100; // TO CHANGE TO DYNAMIC

// create ALL transactions for an individual block
const createTransactions = (
  miner,
  numtransactions,
  b_heigth,
  miningPool,
  wallets,
  subsidy
) => {
  var transactions = []; // list of all transactions
  var users = miningPool; // possible users

  //more than only basecoin transaction is possible
  if (b_heigth > 99 && !done) {
    var fee = 0; //cumulation of fees in the block
    var done = false; // check if there is still possible transactions

    //create transactions
    for (let i = 0; i < numtransactions; i++) {
      //find a valid sender with valid money
      var senderInfo = selectSender(miningPool, users, b_heigth, wallets); // sender adresses to be used

      if (senderInfo != undefined) {
        var sender = senderInfo[0];
        var adressSender = senderInfo[1]; //adress 2 use

        //delete selected adress from adresses pool
        var adressPos = UTXO_Pool[senderInfo[2]].indexOf(adressSender);
        UTXO_Pool[senderInfo[2]].splice(adressPos, 1);

        //select receiver diferent than sender
        var receiver = chooseMiner(miningPool);
        while (receiver == sender) receiver = chooseMiner(miningPool);

        //create transaction
        var tx = singleTransaction(
          sender,
          receiver,
          adressSender,
          b_heigth,
          wallets
        );
        fee += tx.transaction_data.fee; //update fees
        transactions.push(tx); //add transaction to array

        //create adress
        createAdress(
          tx.transaction_data.receiver,
          tx.transaction_data.amount_received,
          b_heigth,
          users
        ); // create adress from transaction result
      } else {
        //no more possible transactions
        done = true;
      }
    }

    //create coin base transaction + fees
    var baseTX = coinbaseTransaction(miner, fee, b_heigth, subsidy);
    transactions.unshift(baseTX); // add transaction to beguinning array

    createAdress(
      baseTX.transaction_data.receiver,
      baseTX.transaction_data.amount_received,
      b_heigth,
      users
    ); // new adress from transaction
  } else {
    // <100 block height --> coinbase transaction with no fees
    var baseTX = coinbaseTransaction(miner, 0, b_heigth, subsidy);
    transactions.push(baseTX);

    // create + add adress it to adress pool
    createAdress(
      baseTX.transaction_data.receiver,
      baseTX.transaction_data.amount_received,
      b_heigth,
      users
    );
  }

  return transactions;
};

//select a sender with valid money to create transaction
const selectSender = (miningPool, users, block_height, wallets) => {
  var usersChecked = []; //users with no valid adresses
  var found = false;
  var counter = 0;
  var sender = chooseMiner(miningPool); //select a random sender
  var senderPos = users.findIndex((pos) => {
    return pos == sender;
  });
  while (found == false && counter < 50) {
    usersChecked.push(sender); //add current sender to checked users

    // check if there is any valid adreess
    var validHeigth = block_height - MINIMUM_DEPTH;
    var senderInfo;

    //TODO: right now we are getting UTXO, implement adress and get adress
    for (let adressPos in UTXO_Pool[senderPos]) {
      var adress = UTXO_Pool[senderPos][adressPos]; //get adress from adress pool

      // valid adress for a certain userfound
      if (adress[2] <= validHeigth) {
        found = true;
        var senderInfo = [sender, adress, senderPos]; // [laura, [laura, 50BTC, block 3], position 15]
        return senderInfo;
      }
    }
    //valid adress for certain user not found
    if (!found) {
      senderPos + 1 >= miningPool.length
        ? (senderPos = senderPos + 1 - miningPool.length)
        : senderPos++;
      sender = miningPool[senderPos];
    }
    counter++;
  }
  return senderInfo;
};

//function to add adress to adresses pool
const addUTXO2Pool = (myUTXO, users) => {
  var pos = users.findIndex((pos) => {
    return pos == myUTXO[0];
  });
  UTXO_Pool[pos].push(myUTXO);
};

// fuction to create an adress
const createAdress = (user, amount, weight, users) => {
  var newUTXO = [user, amount, weight]; // create address
  addUTXO2Pool(newUTXO, users); // add it to the pool

  return newUTXO;
};

export default createTransactions;
