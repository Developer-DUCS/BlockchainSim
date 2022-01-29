var ECKey = require("ec-key");
var BITCOIN_ELLIPTIC_CURVE = "secp256k1";

const createPublicKeyAndAdress = () => {
  //create public and private key
  var randomKey = ECKey.createECKey(BITCOIN_ELLIPTIC_CURVE);
  var privateKey = buf2hex(randomKey.d);
  var publicKey = buf2hex(randomKey.x);
  console.log("private key: ",privateKey);
  console.log("public key: ", publicKey);
};

//turn buffer of Unit8Array to haxdecimal number hash
function buf2hex(buffer) {
  // buffer is an ArrayBuffer
  return [...new Uint8Array(buffer)]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}

export default createPublicKeyAndAdress;
