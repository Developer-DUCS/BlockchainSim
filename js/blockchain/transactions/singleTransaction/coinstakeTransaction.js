const sjcl = require("../../../sjcl");
const {
  createAddress,
  createPublicPrivateKey,
} = require("../../testValidation");

/*
    --> coinstakeTransaction.JS FILE

    --> INPUTS:
      - stakeWallet: wallet w/ available balance selected for stake
      - UTXO_stake: list of 1 or more UTXO's passed in as the Minter's stake
      - block_heigth: the height of the block 
      - etc...

    --> OUTPUTS:
      - coinbaseJSON: a single transaction as a JSON object 
      - (I call it coinbaseJSON as well to make it easier in transaction.js)

    *CONNECTIONS*:
      - File called from transactions.js (createTransactions() -> coinstakeTransaction())
      - File calls: 
        * sjcl() (sjcl.js) -->  used to create hashes and convert to hexadecimal
*/

// ToDo:
// 1. Fix SelectMinter in transaction.js (it is part of PoS)
//        - it returns undefined UTXOs 1/2 the time
// 3. Fix sent/received amount in stake - they should be the same
//        - because a stake is a transaction to yourself
// 4. change subsidy to be dependent on stake
//        - dynamic subsidy
// 5. change Miner label to *Minter* in block visualizer
// 6. Label the stake as a stake so the user can tell the difference
//
// In the future...
// - Allow the simulation creator to stake coins
// - There is a lot more you can do with PoS

const NUMBER_DECIMALS = 100000;

function coinstakeTransaction(
  users,
  stakeWallet,
  UTXO_stake,
  fee,
  block_height,
  subsidy,
  halvings,
  totalCoin,
  walletArr,
  UTXO_Pool
) {
  if (block_height / halvings >= 1) {
    subsidy = subsidy / 2 ** Math.floor(block_height / halvings);
  }
  //ADJUST SUBSIDY HERE
  totalCoin = totalCoin + subsidy;
  var sender_leftover = subsidy;
  var walletArr;
  var coinInputInfo = selectStake(UTXO_stake);
  //coinInputInfo = [fee, amount_sent, sender_leftover, selectedUTXO, amount_received]
  //console.log("coinInputInfo: " + coinInputInfo);
  var fee = coinInputInfo[0];
  var amount_sent = coinInputInfo[1]; //STAKE
  //console.log("amount_sent: " + amount_sent);
  var selectedUTXO = coinInputInfo[2];
  //console.log("selectedUTXO : " + selectedUTXO);
  var amount_received = coinInputInfo[3];
  //console.log("amount_received: " + amount_received);

  // delete UTXOs that are going to be spent
  var wallPos = users.indexOf(stakeWallet[0]);
  walletArr[wallPos][4] += sender_leftover; // update wallet amount (w/ leftover for PoS)
  var adrsSender = [];
  for (var i = 0; i < selectedUTXO.length; i++) {
    adrsSender.push(selectedUTXO[i][0]);

    UTXO_Pool = UTXO_Pool.filter((e) => {
      return e[0] !== selectedUTXO[i][0];
    });

    walletArr[wallPos][3] = walletArr[wallPos][3].filter((e) => {
      return e !== selectedUTXO[i][0];
    });

    //add adrs to used addresses + height
    //newLdgerEle = [ sent , address, coin_sent, block_height]
    var newLedgerEle = ["sent", selectedUTXO[i][0], amount_sent, block_height];
    // walletArr[wallPos][5].push(newLedgerEle);
  }

  // No need for sender_leftover address,
  // because that is coming from the blockchain as subsidy

  // address receiver
  // Stake is a transaction to yourself, so receiver is also sender
  var out_receiver_address_info = createAddressInfo(
    stakeWallet[0],
    amount_received,
    block_height,
    users,
    walletArr,
    UTXO_Pool
  );
  var out_receiver_address = out_receiver_address_info[0];
  walletArr = out_receiver_address_info[1];
  UTXO_Pool = out_receiver_address_info[2];

  //UTXO_Pool = [user, $$$, height]

  var coinstake =
    "{ transaction_data: { UTXO: , owner_UTXO: " +
    adrsSender +
    ", receiver: " +
    stakeWallet[0] +
    ", sender_leftover: " +
    sender_leftover +
    " , fee: " +
    fee + //fees are burned in PoS. Implement this
    ", amount_sent: " +
    amount_sent +
    " , amount_received: " +
    amount_received +
    ", block_height: " +
    block_height +
    "} }";

  //hash the info
  var bitHash = sjcl.hash.sha256.hash(coinstake);
  var transactionHash = sjcl.codec.hex.fromBits(bitHash);

  //create json object
  var coinbaseJSON = {
    hash: transactionHash,

    //look above for clarification on these values
    transaction_data: {
      sender_wallet: stakeWallet[0],
      addresses_input_UTXO: adrsSender,
      amount_sent: amount_sent,
      amount_received: amount_received,
      receiver_address: out_receiver_address,
      receiver_wallet: stakeWallet[0],
      sender_leftover: sender_leftover,
      sender_leftover_address:
        "000000000000000000000000000000000000000000000000000000000000000000000000000000",
      fee: fee, //burn
      block_height: block_height,
    },
  };
  //same format as coinbaseTX data
  return [coinbaseJSON, totalCoin, walletArr, UTXO_Pool];
}

//nothing different about this function
function createAddressInfo(
  wallet,
  amount,
  weight,
  users,
  walletArr,
  UTXO_Pool
) {
  var keys = createPublicPrivateKey();
  var address = createAddress(keys[2]);
  var walletPos = users.indexOf(wallet);
  walletArr[walletPos][3].push(address); // add adress to wallet
  var newLedgerEle = ["received", address, amount, weight];
  // walletArr[walletPos][5].push(newLedgerEle);
  var newUTXO = [address, amount, weight]; // create new UTXO
  UTXO_Pool.push(newUTXO); //add UTXO to pool
  return [address, walletArr, UTXO_Pool];
}

// select the amount of coin to spend in the transactions and the UTXOs to use
// -> this function seems to be working fine, it is just that sometimes
//    selectMinter will send undefined values.
const selectStake = (UTXO_stake) => {
  // CASE 1: ony one possible input
  if (UTXO_stake.length == 1) {
    console.log("single UTXO_stake: " + UTXO_stake);
    console.log("single UTXO_stake[0][1]: " + UTXO_stake[0][1]);
    var fee = 0;
    var amount_sent = UTXO_stake[0][1]; //amount_sent = amount_received
    var amount_received = UTXO_stake[0][1]; //stake is Tx to yourself!
    var selectedUTXO = UTXO_stake;
  }
  // CASE 2: more than one UTXO input possible
  else {
    // 1) select # UTXOs to spend
    console.log("mult. UTXO_stake: " + UTXO_stake);
    console.log("mult. UTXO_stake[0][1]: " + UTXO_stake[0][1]);
    var numaddresses2use = Math.floor(
      Math.random() * (UTXO_stake.length - 1) + 1
    );
    console.log("numaddresses2use: " + numaddresses2use);
    // 2) calculate fees
    var fee = 0;
    // 3) calculate total possible to be spent
    var total = 0;
    var coinLastUTXO;
    for (var i = 0; i < numaddresses2use; i++) {
      i == numaddresses2use - 1
        ? (coinLastUTXO = UTXO_stake[i][1])
        : (total = total + UTXO_stake[i][1]);
    }
    // 4) select random amount to spend
    var amount2spendLast =
      Math.round(
        (Math.random() * coinLastUTXO + Number.EPSILON) * NUMBER_DECIMALS
      ) / NUMBER_DECIMALS; // round to 5 decimals
    //console.log("amount2spendLast: " + amount2spendLast);
    var amount_received =
      Math.round(
        (total + amount2spendLast + Number.EPSILON) * NUMBER_DECIMALS
      ) / NUMBER_DECIMALS;
    var amount_sent =
      Math.round((total + coinLastUTXO + Number.EPSILON) * NUMBER_DECIMALS) /
      NUMBER_DECIMALS;

    console.log("amount_sent : " + amount_sent);
    console.log("amount_received : " + amount_received);

    var selectedUTXO = [];
    for (var i = 0; i < numaddresses2use; i++) selectedUTXO.push(UTXO_stake[i]);
  }

  return [fee, amount_sent, selectedUTXO, amount_received];
};

module.exports = coinstakeTransaction;
