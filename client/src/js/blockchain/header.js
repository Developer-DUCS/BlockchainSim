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

import sjcl from "../../sjcl";

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

const createHeader = (previousHash, merkleTree) => {
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
  var selectedHash;

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

  return selectedHash;
};

export default createHeader;
// TODO:
//        save previous block hash before and after
//        create a while loop to simulate attempts at solving the hash

/* //sim_blocks JSON object
const sim_blocks = {
  1: "0104db27ef0e770ea5b0786880ee0883b13b04eeb7c34acebc77c4e47957ae95",
  2: "081d730172ca30cd21eaf9f2c6eb41d70b6ff64910b6ce959a0505be0ba729de",
  3: "076b23542004b61dea24d6ceef487ee81fcf7ecde0ce0a726e07550c6e6a39f4",
  4: "014ae7f504e6ac8439ad29f8bdafcfed4ec3d74364dbb0ffdc8df8827861439f",
  5: "00452e6e3a9450d6a8366a12db71c771a42ce6e93bf85912ac51d4434e721add",
};

//header JSON Object
const header = {
  version: "00000020",
  previousHash:
    "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
  merkleTree:
    "113459eb7bb31bddee85ade5230d6ad5d8b2fb52879e00a84ff6ae1067a210d3",
  target: "00000000",
  nonce: "16c4c4b0",
};
*/
