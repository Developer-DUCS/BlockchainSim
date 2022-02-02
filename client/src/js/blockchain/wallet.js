import sjcl from "../../sjcl";
//initial file to code the wallet

// we would start by having a wallet per user.
// every wallet intry would have:
// [wallet_id, owner, simulation_id, adresses_aviable]

// TODO:  simulation ID missing
// TODO: possibility of more than one wallet

const createWallet = (miningPool) => {
  var walletArr = [];

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

export default createWallet;
//create a wallet per user
