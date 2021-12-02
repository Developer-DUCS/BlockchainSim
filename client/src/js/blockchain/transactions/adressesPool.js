/*
    Notes:  - use some kind of hash table?.
            - add some kind of identificator to the every adress to know the user that posses it.
            - there can be copies of adresses.
            - think about possible ledger later on --> adresses and transaction table woul be feeded here? 
*/

import { getMiningPool } from "../block/miningPool";

var miningPool;

//function to get miners for adress pool
const createAdressPoolHeader = () => {
  miningPool = getMiningPool();
};

//
const add2AdrPool = () => {};

//
const deleteOfAdrPool = () => {};

const getAdress = () => {};

export default ctreateAdressPool;
export { add2AdrPool, deleteOfAdrPool, getAdress };
