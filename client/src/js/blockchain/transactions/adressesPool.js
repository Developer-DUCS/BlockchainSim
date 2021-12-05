/*
    Notes:  - use some kind of hash table?.
            - add some kind of identificator to the every adress to know the user that posses it.
            - there can be copies of adresses.
            - think about possible ledger later on --> adresses and transaction table woul be feeded here? 

    Adress structure:
    [ user, $$$ , parent_block]
*/

const adressesPool = [];

const createAdressPoolHeader = (numMiners) => {
  //adressesPool.splice(0, adressesPool.length); // not sure if this works
  if (adressesPool.length == 0) {
    for (var i = 0; i < numMiners; i++) {
      adressesPool.push([]);
    }
  }
};

const add2AdrPool = () => {};

//
const deleteOfAdrPool = () => {};

const getAdress = () => {};

export default createAdressPoolHeader;
export { add2AdrPool, deleteOfAdrPool, getAdress, adressesPool };
