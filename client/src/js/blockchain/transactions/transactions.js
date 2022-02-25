const singleTransaction = require("./singleTransaction/singleTransaction");
const coinbaseTransaction = require("./singleTransaction/coinbaseTransaction");
const { UTXO_Pool } = require("./UTXO_Pool");
const { walletArr, chooseWallet } = require("../wallet");
// import createAddress, { createPublicPrivateKey } from "../testValidation";

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
  subsidy,
  halvings,
  totalCoin
) => {
  if(b_heigth == 150) console.log(" wallets: ", walletArr)
  var transactions = []; // list of all transactions
  var users = []; // possible users
  for (let wallet in walletArr) {
    users.push(walletArr[wallet][0]);
  }

  //more than one transaction is possible
  if (b_heigth > MINIMUM_DEPTH - 1 && !done) {
    var fee = 0; //cumulation of fees in the block
    var done = false; // check if there is still possible transactions
    var max_transactions = ~~(b_heigth / MINIMUM_DEPTH); // ~~ truncates number 1.0 --> 1
    if (max_transactions < numtransactions) numtransactions = max_transactions;

    //create transactions
    for (let i = 0; i < numtransactions; i++) {
      //find a valid sender with valid money
      var senderInfo = selectSender(b_heigth); // sender adresses to be used
      // [senderWallet, utxoArr];

      if (senderInfo != undefined) {
        var senderWallet = senderInfo[0]; // sender wallet for transaction
        var UTXOs_Sender = senderInfo[1]; // UTXOs input for transaction

        //select receiver diferent than sender
        var receiverWallet = chooseWallet(walletArr);
        while (receiverWallet == senderWallet)
          receiverWallet = chooseWallet(walletArr);

        //create transaction
        var tx = singleTransaction(
          senderWallet,
          receiverWallet,
          UTXOs_Sender,
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
    var transInfo = coinbaseTransaction(
      users,
      minerWallet,
      fee,
      b_heigth,
      subsidy,
      halvings,
      totalCoin
    );
    var baseTX = transInfo[0];
    totalCoin = transInfo[1];

    transactions.unshift(baseTX); // add transaction to beguinning array
  } else {
    // <100 block height --> coinbase transaction with no fees
    for (let wallet in walletArr) {
      if (walletArr[wallet][1] == miner) {
        var minerWallet = walletArr[wallet][0];
      }
    }
    var transInfo = coinbaseTransaction(
      users,
      minerWallet,
      0,
      b_heigth,
      subsidy,
      halvings,
      totalCoin
    );
    var baseTX = transInfo[0];
    totalCoin = transInfo[1];
    transactions.push(baseTX);
  }

  return [transactions, totalCoin];
};

//select a sender with valid money to create transaction
const selectSender = (block_height) => {
  // choose valid UTXO
  var index = 0;
  var utxo = UTXO_Pool[index];
  var validHeigth = block_height - MINIMUM_DEPTH;
  var utxoArr = [];

  var utxoHeigth = utxo[2];
  while (utxoHeigth > validHeigth) {
    // in case the first UTXO is not valid
    index = index + 1;
    utxo = UTXO_Pool[index];
    utxoHeigth = utxo[2];
  }
  utxoArr.push(utxo);
  //console.log( " utxoArr : ", utxoArr)

  //track address and get wallet --> RECHECK THIS
  var address2find = utxo[0];
  var found = false;
  var senderWallet;
  var i = 0;
  while (!found && i < walletArr.length){
    adrs = walletArr[i][3];
    //console.log(" addrs wallet ",i," : ",adrs)
    if(adrs.indexOf(address2find) != -1){
      found = true
      senderWallet = walletArr[i]
    }
    i++;
  }

  // check if wallet is undefined
  if(senderWallet == undefined){
    if(block_height%20 == 0)console.log("PROBLEM WAS HERE", block_height);
    var wallP = Math.floor(Math.random() * walletArr.length);
    senderWallet = walletArr[wallP];
    senderWallet[3].push(address2find);
    
  }

  //check if that wallet has more then one possible utxo.
  if (senderWallet.length > 1) {
    //get total amount of valid UTXOS in wallet
    var addressesArr = senderWallet[3];
    // find UTXOs attached to address
    var utxosFound = UTXO_Pool.filter((utx) => {
      return addressesArr.indexOf(utx[0]) != -1;
    });

    // get valid UTXOs
    utxoArr = utxosFound.filter((utx) => {
      return utx[2] <= validHeigth;
    });
  }

  var senderInfo = [senderWallet, utxoArr]; // [laura, [askbvasebraienv, 50BTC, block 3]]

  return senderInfo;
};

module.exports = createTransactions;
