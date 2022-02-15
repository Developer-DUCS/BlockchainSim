import sjcl from "../../../sjcl";

/*
    --> MERKLETREE.JS FILE

    --> INPUTS:
      - transactions: list of transactions as JSON objects 

    --> OUTPUTS:
      - merkleroot (createMerkleTree()): a recursive hash of all transactions

    --> CONNECTIONS:
      - File called from block.js
          - MerkleRoot used in createHeader()
     
    --> TODO: 
      - make merkleRoot visible in block view
      - use merkleRoot to look up transactions (?)
      - create a visualization of merkleTree
        
    --> The Merkle tree is included in the block header. 
        Merkle trees include hashes of all the transactions 
        organized in a data structure. 
*/

const createMerkleTree = (transactions) => {
  //collect all transaction hashes in a block
  const txHashes = [];
  for (let i = 0; i < transactions.length; i++) {
    txHashes.push(transactions[i].hash);
  }
  //recursively hash transactions in pairs until you are left with the merkleRoot
  var merkleRoot = recursiveHashing(txHashes);
  return merkleRoot;
};

const recursiveHashing = (txList) => {
  //if only 1 tx exists, return it
  if (txList.length == 1) {
    //console.log("returned 1 hash: " + txList[0]);
    return txList[0];
  }

  //hash transactions in pairs
  const newHashList = [];
  for (let i = 0; i < txList.length - 1; i = i + 2) {
    newHashList.push(hashify(txList[i], txList[i + 1]));
  }

  //if the # of hashes is odd, hash the last tx twice
  if (txList.length % 2 == 1) {
    newHashList.push(hashify(txList[-1], txList[-1]));
  }

  //recursive call w/ newHashList -> iterate until stopping condition
  return recursiveHashing(newHashList);
};

//function for hashing two transactions together
const hashify = (hash1, hash2) => {
  var hashPair = "";
  hashPair += hashPair.concat(hash1, hash2);
  var bithash = sjcl.hash.sha256.hash(hashPair);
  var hash = sjcl.codec.hex.fromBits(bithash);
  return hash;
};

export default createMerkleTree;
