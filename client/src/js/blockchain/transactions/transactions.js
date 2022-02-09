import singleTransaction from "./singleTransaction/singleTransaction";
import coinbaseTransaction from "./singleTransaction/coinbaseTransaction";
import { UTXO_Pool } from "./UTXO_Pool";
import { walletArr, chooseWallet } from "../wallet";
import createAddress, { createPublicPrivateKey } from "../testValidation";

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
const createTransactions = (miner, numtransactions, b_heigth, subsidy) => {
  var transactions = []; // list of all transactions
  var users = []; // possible users
  for (let wallet in walletArr) {
    users.push(walletArr[wallet][0]);
  }

  //more than only basecoin transaction is possible
  if (b_heigth > 99 && !done) {
    var fee = 0; //cumulation of fees in the block
    var done = false; // check if there is still possible transactions

    //create transactions
    for (let i = 0; i < numtransactions; i++) {
      //find a valid sender with valid money
      var senderInfo = selectSender(users, b_heigth); // sender adresses to be used

      if (senderInfo != undefined) {
        var senderWallet = senderInfo[0];
        var addressSender = senderInfo[1]; //adress 2 use
        var UTXO_Sender = senderInfo[2];

        //select receiver diferent than sender
        var receiverWallet = chooseWallet(walletArr);
        while (receiverWallet == senderWallet)
          receiverWallet = chooseWallet(walletArr);

        //create transaction
        var tx = singleTransaction(
          senderWallet,
          receiverWallet,
          addressSender,
          UTXO_Sender,
          b_heigth,
          users
        );

        fee += tx.transaction_data.fee; //update fees
        transactions.push(tx); //add transaction to array
      } else {
        //no more possible transactions
        done = true;
      }
    }

    //create coin base transaction + fees
    for (let wallet in walletArr) {
      if (walletArr[wallet][1] == miner) var minerWallet = walletArr[wallet][0];
    }
    //create coin base transaction + fees
    var baseTX = coinbaseTransaction(
      users,
      minerWallet,
      fee,
      b_heigth,
      subsidy
    );
    transactions.unshift(baseTX); // add transaction to beguinning array
  } else {
    // <100 block height --> coinbase transaction with no fees
    for (let wallet in walletArr) {
      if (walletArr[wallet][1] == miner) {
        var minerWallet = walletArr[wallet][0];
      }
    }
    var baseTX = coinbaseTransaction(users, minerWallet, 0, b_heigth, subsidy);
    transactions.push(baseTX);
  }

  return transactions;
};

//select a sender with valid money to create transaction
const selectSender = (users, block_height) => {
  var usersChecked = []; //users with no valid adresses
  var found = false;
  var counter = 0;
  var senderWallet = chooseWallet(walletArr); //select a random sender
  var senderPos = users.findIndex((pos) => {
    return pos == senderWallet;
  });
  while (found == false && counter < walletArr.length) {
    usersChecked.push(senderWallet); //add current sender to checked users

    // check if there is any valid adreess
    var validHeigth = block_height - MINIMUM_DEPTH;
    var senderInfo;
    for (let i in walletArr[senderPos][3]) {
      var address = walletArr[senderPos][3][i];
      var utxos = UTXO_Pool.filter((ele) => ele[0] == address);

      // valid adress for a certain userfound
      if (utxos[0][2] <= validHeigth) {
        found = true;
        var senderInfo = [senderWallet, address, utxos[0], senderPos]; // [laura, [laura, 50BTC, block 3], position 15]
        return senderInfo;
      }
    }

    //valid adress for certain user not found
    if (!found) {
      senderPos + 1 >= walletArr.length
        ? (senderPos = senderPos + 1 - walletArr.length)
        : senderPos++;
      senderWallet = walletArr[senderPos][0];
    }
    counter++;
  }
  return senderInfo;
};

export default createTransactions;
