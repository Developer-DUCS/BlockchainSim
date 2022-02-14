import sjcl from "../../sjcl";
//initial file to code the wallet

// we would start by having a wallet per user.
// every wallet intry would have:
//[wallet_id, owner, simulation_id, adresses_aviable]

// TODO:  simulation ID missing
// TODO: possibility of more than one wallet
const walletArr = [];

const randomSelector = (min, max) => {
  let num = Math.random() * (max - min) + min;
  return Math.floor(num);
};

const createWallet = (miningPool) => {
  //initialize wallets
  for (var i = 0; i < miningPool.length; i++) {
    var random = Math.floor(Math.random() * 1000).toString();
    var newIdbitHash = sjcl.hash.sha256.hash(miningPool[i] + random);
    var hash = sjcl.codec.hex.fromBits(newIdbitHash);
    var newWallet = [hash, miningPool[i], "simulationTest", []];
    walletArr.push(newWallet);
  }
  return walletArr;
};

const chooseWallet = (wallets) => {
  var randomWalletNum = randomSelector(0, wallets.length - 1); // select a number
  var selectedWallet = walletArr[randomWalletNum]; // get wallet entry from the array
  var walletID = selectedWallet[0];
  return walletID;
};

export default createWallet;
export { chooseWallet, walletArr };

//create a wallet per user
