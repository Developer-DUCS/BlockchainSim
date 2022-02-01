import { ripemd160, sha256 } from "hash-wasm";
const ECKey = require("ec-key");
const base58 = require("base58-encode");

// ENCRIPTATION PACKAGES AND THEIR DOCUMENTATION
//ECKey npm package: https://github.com/usrz/ec-key#-tostring-format-
//hash-wasm package : https://npm.io/package/hash-wasm
//base58 npm package: https://www.npmjs.com/package/base58-encode

const BITCOIN_ELLIPTIC_CURVE = "secp256k1"; // Elliptic curve on use
const CHARACTERS_FOR_CHECK_SUM = 7;

async function createKeysAdressSignature() {
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
  console.log("varification: ", verify); //verify signature and msg?

  //create address
  var addressCreationS1 = await sha256(publicKey);
  var encriptedPublicKey = await ripemd160(addressCreationS1);
  var addressCreationS3 = "00" + encriptedPublicKey; // add version
  var addressCreationS4 = await sha256(addressCreationS3);
  var addressCreationS5 = await sha256(addressCreationS4);
  var addressS5Arr = addressCreationS5.slice("");
  var checkSum = addressS5Arr.slice(0, CHARACTERS_FOR_CHECK_SUM).toString();
  var addressCreationS6 = addressCreationS3 + checkSum;
  // var address = base58(addressCreationS6); // the adress

  return;
}

//turn buffer of Unit8Array to haxdecimal number hash string
function buf2hex(buffer) {
  // buffer is an ArrayBuffer
  return [...new Uint8Array(buffer)]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}

export default createKeysAdressSignature;
