/*
    /*
    --> UTXO_POOL.JS FILE

    --> FUNCTIONS:
      - createAdressPoolHeader()
          - Inputs:
            * num_miners: number of people in the mining pool
          - Outputs:
            * ----
      
      - adressesPool (global object): adress pool that contains valid adresses at certain moment. Adresses get added
            when created in a transaction and deleted when spent in a transaction
          - How that table looks like:
          -------------------------------------------------------------------------------
          |  u1        | u2         | u3         | u4         | ...      | uX           |
          -------------------------------------------------------------------------------
          | [u1,50,0]  |[u2,50,1]   |[u3,50,3]   | [u4,20,4]  | ...      | [ux,50,2]    |
          | [u1,10,50] |            |[u3,10,120] |            | ...      | [ux,0.5,101] |
          |            |            |[u3,2,201]  |            | ...      |              |
          -------------------------------------------------------------------------------

          - adress structure: [ user, $$$, block_parent] --> [u3, 50 , 2]
              * user: person who owns the adress
              * $$$: amount of coin that adress has
              * block_parent: height of the block where the adress was created

    *CONNECTIONS*:
      - File called from block.js (blockCreator())
      - File calls: 
        * chooseMiner() (miningPool.js) --> choose a user from already created pool of miners
        * coinbaseTransaction() (coinbaseTransaction.js) --> create coin base transaction
        * singleTransaction() (singleTransaction.js) --> create a transaction between two users given an array of adresses
        * adressesPool (adressesPool.js) --> dynamic pool with all non spended UTXOs
*/

//UTXO pool is needed
// what it is the structure of an UTXO exactly?
// actual transaction form [amount, script locking size, script lock]
// pay-to-public-hash script
// locking script plus unlocking script

const UTXO_Pool = [];

const createUTXOPoolHeader = (numMiners) => {
  if (UTXO_Pool.length == 0) {
    for (var i = 0; i < numMiners; i++) {
      UTXO_Pool.push([]);
    }
  }
};

export default createUTXOPoolHeader;
export { UTXO_Pool };
