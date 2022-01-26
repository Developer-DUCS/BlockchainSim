//initial file to code the wallet

// we would start by having a wallet per user.
// every wallet intry would have:
//[wallet_id, owner, simulation_id, adresses_aviable]
import { string } from "prop-types";
import sjcl, { random } from "../../sjcl";

const createWallet = (miningPool) => {
  console.log("in");
  var walletArr = [];
  for (var i = 0; i < 4; i++) {
    var random = toString(Math.random() * 1000);
    console.log(random);
    var bithash1 = sjcl.hash.sha256.hash("something" + toString(random));
    var hash1 = sjcl.codec.hex.fromBits(bithash1);
    console.log(hash1);
    print();
  }

  /* for (person in miningPool){
        newId = 
        newWallet = []
    } */

  console.log(walletArr);
};

export default createWallet;
//create a wallet per user
