import sjcl from "../../sjcl";
import chooseMiner from "../blockchain/miningPool";
// construct header
// Bitcoin uses little endian format for many of these values. We are not.
const version = "00000020";
const time = "2b80475f";
const target = "00000000"; //no difficulty
var previousHash =
  "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8";
var merkleTree =
  "113459eb7bb31bddee85ade5230d6ad5d8b2fb52879e00a84ff6ae1067a210d3";
var nonce;

// create random nonce value which will be
// exactly 4 bytes in hexadecimal (8 characters)
const random = (min = 268435456, max = 4294967295) => {
  let num = Math.random() * (max - min) + min;
  return Math.floor(num);
};

const createHeader = () => {
  var difficulty =
    "1000000000000000000000000000000000000000000000000000000000000000";
  // Note: Difficulty is hard-coded, and the target difficulty in the header doesn't do anything.
  // We might want dynamic difficulty for future sprints.
  var intNonce = random();
  var blockHeader;

  // hashing function creates blockheader with a new nonce taken as input.
  // Then returns a sha256d of the blockheader
  var hashing = (intNonce) => {
    blockHeader = "";
    nonce = intNonce.toString(16);
    blockHeader += blockHeader.concat(
      version,
      previousHash,
      merkleTree,
      time,
      target,
      nonce
    );

    //double sha256 block header
    var bithash1 = sjcl.hash.sha256.hash(blockHeader);
    var hash1 = sjcl.codec.hex.fromBits(bithash1);
    var bithash2 = sjcl.hash.sha256.hash(hash1);
    var hash2 = sjcl.codec.hex.fromBits(bithash2);
    return hash2;
  };

  // variables for looping and collecting data
  var i = 1;
  var done = false;
  var HashResults = [];

  while (done == false) {
    var hash = hashing(intNonce);
    if (hash <= difficulty) {
      HashResults.push(hash);
      done = true;
    } else {
      HashResults.push(hash);
      //console.log("Hash #" + i + " is > target: " + hashing(intNonce) )
      intNonce++;
      i++;
    }
  }

  console.log(HashResults);
};

export default createHeader;
// TODO:
//        save previous block hash before and after
//        create a while loop to simulate attempts at solving the hash
