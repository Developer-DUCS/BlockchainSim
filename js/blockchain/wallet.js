const sjcl = require("../sjcl");
//initial file to code the wallet

// we would start by having a wallet per user.
// every wallet intry would have:
//[wallet_id, owner, simulation_id, adresses_aviable, balance, pesonal_ledger]
// personal_ledger = [[sent/received, address, coin, blockheight], ...]

// TODO:  simulation ID missing
// TODO: possibility of more than one wallet
// const walletArr = [];

const randomSelector = (min, max) => {
  let num = Math.random() * (max - min) + min;
  return Math.floor(num);
};

const createWallet = (miningPool) => {
  let walletArr = [];
  //initialize wallets
  for (var i = 0; i < miningPool.length; i++) {
    var random = Math.floor(Math.random() * 1000).toString();
    var newIdbitHash = sjcl.hash.sha256.hash(miningPool[i] + random);
    var hash = sjcl.codec.hex.fromBits(newIdbitHash);
    // TODO: add balance field for wallets?
    var newWallet = [hash, miningPool[i], "simulationTest", [], 0, []]; // TODO: DELETE SIMULATION TEST
    walletArr.push(newWallet);
  }
  return walletArr;
};

const chooseWallet = (wallets) => {
  var randomWalletNum = randomSelector(0, wallets.length - 1); // select a number
  var selectedWallet = wallets[randomWalletNum]; // get wallet entry from the array
  var walletID = selectedWallet[0];
  return walletID;
};

module.exports = { chooseWallet, createWallet };

//create a wallet per user
