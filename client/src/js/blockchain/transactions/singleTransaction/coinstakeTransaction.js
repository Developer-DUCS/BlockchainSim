const sjcl = require("../../../../sjcl");
const {
  createAddress,
  createPublicPrivateKey,
} = require("../../testValidation");
const { walletArr } = require("../../wallet");
const { UTXO_Pool } = require("./../UTXO_Pool");

/*

--> PROOF_OF_STAKE INFO

    - Based on PeerCoin's original PoS model - found here: https://docs.peercoin.net/

    - I made a presentation that explains how this will work
    
--> coinstakeTransaction.JS FILE

    --> INPUTS:
      
    --> OUTPUTS:
     - coinbaseJSON: a single transaction as a JSON object

    *CONNECTIONS*:


I might need help with the client side and database 



*/
