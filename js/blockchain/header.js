/*
    CONSTRUCTION OF THE HEADER - Construction of the header of block

        Inputs need from block.js: 
            - previousHash: hash of the previous block
            - merkleTree: merkle tree of the transactions

        Outputs:
            - hash of the block
            - JSON object with the header information
                {
                    version: "00000020",
                    previousHash: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
                    merkleTree: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
                    time: "2b80475f",
                    target: "00000000",
                    nonce: "4d6d557c"
                }
*/

const sjcl = require("../sjcl");

const version = "00000020";
const time = "2b80475f";
const target = "00000000"; //no difficulty
var nonce;

// create random nonce value which will be
// exactly 4 bytes in hexadecimal (8 characters)
const random = (min = 268435456, max = 4294967295) => {
  let num = Math.random() * (max - min) + min;
  return Math.floor(num);
};

const createHeader = (previousHash, merkleRoot) => {
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
      merkleRoot,
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
  var selectedHash;

  // check if it meets the difficulty
  while (done == false) {
    var hash = hashing(intNonce);
    if (hash <= difficulty) {
      selectedHash = hash;
      done = true;
    } else {
      intNonce++;
      i++;
    }
  }

  //create header JSON object
  var objectJSON = {
    version: "00000020",
    previousHash: previousHash,
    merkleRoot: merkleRoot,
    time: "2b80475f",
    target: "00000000", //possible change to dynamic?
    nonce: nonce,
  };

  return [selectedHash, objectJSON];
};

module.exports = createHeader;
