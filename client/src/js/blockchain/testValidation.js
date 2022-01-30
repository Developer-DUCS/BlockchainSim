var ECKey = require("ec-key");
var BITCOIN_ELLIPTIC_CURVE = "secp256k1"; // Posibility of using different elliptic curves? not sure it gives any meaning

const createPublicKeyAndAdress = () => {
  //create public and private key
  var msg = "trial";
  var randomKey = ECKey.createECKey(BITCOIN_ELLIPTIC_CURVE);
  var privateKey = buf2hex(randomKey.d);
  var publicKey = buf2hex(randomKey.x);

  // would the msg be transaction? or adress?
  var signature = randomKey.createSign("SHA256").update(msg).sign("base64");
  var verify = randomKey
    .createVerify("SHA256")
    .update(msg)
    .verify(signature, "base64");
  console.log("private key: ", privateKey);
  console.log("public key: ", publicKey);
  console.log("signature: ", signature);
  console.log("varification: ", verify);

  //create address
};

//turn buffer of Unit8Array to haxdecimal number hash
function buf2hex(buffer) {
  // buffer is an ArrayBuffer
  return [...new Uint8Array(buffer)]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}

export default createPublicKeyAndAdress;
