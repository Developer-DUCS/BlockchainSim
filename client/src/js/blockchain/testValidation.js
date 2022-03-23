const ECKey = require("ec-key");
const base58 = require("base58-encode");
const sjcl = require("../../sjcl");

// ENCRIPTATION PACKAGES AND THEIR DOCUMENTATION
//ECKey npm package: https://github.com/usrz/ec-key#-tostring-format-
//base58 npm package: https://www.npmjs.com/package/base58-encode

const BITCOIN_ELLIPTIC_CURVE = "secp256k1"; // Elliptic curve on use
const CHARACTERS_FOR_CHECK_SUM = 7;

function createPublicPrivateKey() {
  var randomKey = ECKey.createECKey(BITCOIN_ELLIPTIC_CURVE);
  var privateKey = buf2hex(randomKey.d);
  var publicKey = buf2hex(randomKey.x);
  return [randomKey, privateKey, publicKey];
}

function createAddress(publicKey) {
  var addressCreationS1bit = sjcl.hash.sha256.hash(publicKey);
  var addressCreationS1Hash = sjcl.codec.hex.fromBits(addressCreationS1bit);
  var addressCreationS3 = "00" + addressCreationS1Hash; // add version
  var addressCreationS4bit = sjcl.hash.sha256.hash(addressCreationS3);
  var addressCreationS4Hash = sjcl.codec.hex.fromBits(addressCreationS4bit);
  var addressCreationS5bit = sjcl.hash.sha256.hash(addressCreationS4Hash);
  var addressCreationS5Hash = sjcl.codec.hex.fromBits(addressCreationS5bit);
  var addressS5Arr = addressCreationS5Hash.slice("");
  var checkSum = addressS5Arr.slice(0, CHARACTERS_FOR_CHECK_SUM).toString();
  var addressCreationS6 = addressCreationS3 + checkSum;
  var address = base58(addressCreationS1Hash); // the address

  return address;
}

function createSignature(keyPair, address) {
  var signature = keyPair.createSign("SHA256").update(address).sign("base64");
  return signature;
}

function validateSignature(signature, address, keyPair) {
  var verify = keyPair
    .createVerify("SHA256")
    .update(address)
    .verify(signature, "base64");

  return verify;
}

// turn buffer of Unit8Array to haxdecimal number hash string
function buf2hex(buffer) {
  // buffer is an ArrayBuffer
  return [...new Uint8Array(buffer)]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}

module.exports = {
  validateSignature,
  createSignature,
  createPublicPrivateKey,
  createAddress,
};
