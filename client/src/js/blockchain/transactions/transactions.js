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
        var sender = senderInfo[0];
        var adressSender = senderInfo[1]; //adress 2 use

        //delete selected adress from adresses pool
        var adressPos = UTXO_Pool[senderInfo[2]].indexOf(adressSender);
        UTXO_Pool[senderInfo[2]].splice(adressPos, 1);

        //select receiver diferent than sender
        var receiver = chooseWallet(walletArr);
        while (receiver == sender) receiver = chooseWallet(walletArr);

        //create transaction
        var tx = singleTransaction(sender, receiver, adressSender, b_heigth);
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
    for (let wallet in walletArr) {
      if (walletArr[wallet][1] == miner) var minerWallet = walletarr[wallet][0];
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

    createAdress(
      baseTX.transaction_data.receiver,
      baseTX.transaction_data.amount_received,
      b_heigth,
      users
    ); // new adress from transaction
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
  var sender = chooseWallet(walletArr); //select a random sender
  var senderPos = users.findIndex((pos) => {
    return pos == sender;
  });
  while (found == false && counter < wallets.length) {
    usersChecked.push(sender); //add current sender to checked users

    // check if there is any valid adreess
    var validHeigth = block_height - MINIMUM_DEPTH;
    var senderInfo;

    for (let adressPos in walletArr[senderPos][3]) {
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
      senderPos + 1 >= walletArr.length
        ? (senderPos = senderPos + 1 - walletArr.length)
        : senderPos++;
      sender = walletArr[senderPos][0];
    }
    counter++;
  }
  return senderInfo;
};

// fuction to create an adress
const createAdress = (user, amount, weight, users) => {
  var keys = createPublicPrivateKey();
  var address = createAddress(keys[2]);
  var walletPos = users.indexOf(user);
  walletArr[walletPos][3].push(address); // add adress to wallet
  var newUTXO = [address, amount, weight]; // create new UTXO
  UTXO_Pool.push(newUTXO); //add UTXO to pool
  console.log("New address: ", address, "new UTXO: ", newUTXO);
  return address;
};

export default createTransactions;
