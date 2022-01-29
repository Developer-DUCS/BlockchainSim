const Bitcoin = require("bitcoin-address-generator");

const createPublicKeyAndAdress = () => {
  var keys = Bitcoin.createWalletAddress((response) => {
    return response;
  });
  var publicKey = keys.parceJSON();
};

export default testValidation;
