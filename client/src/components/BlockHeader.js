import sjcl from "../sjcl";

//construct header
var version = "00000020"
var previousHash = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"
var merkleTree = "113459eb7bb31bddee85ade5230d6ad5d8b2fb52879e00a84ff6ae1067a210d3"
var time = "2b80475f"
var target = "00000000" //no difficulty
var nonce

const random = (min = 1000, max = 9999) => {
  let num = Math.random() * (max - min) + min;
  return Math.floor(num);
};

var intNonce = random() //integer number
// TODO: pass integer to hexadecimal form of 4 bytes (8characters long)
nonce = 2 // Hexadecimal nonce to use
console.log(nonce)

//double hashing
var bithash1 = sjcl.hash.sha256.hash("password")
var hash1 = sjcl.codec.hex.fromBits(bithash1)
console.log(hash1)
var bithash2 = sjcl.hash.sha256.hash(hash1)
var hash2 = sjcl.codec.hex.fromBits(bithash2)

console.log(hash2)

// TODO: how many times or how long it take to obtain a 0 in the first character
// TODO: move this to its own component
//       conect component with landing page?
//       save header info before and after hash
//       pass info from hex to text to be able to be show on the html