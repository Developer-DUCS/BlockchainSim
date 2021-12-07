//NOT BEING USED - TO DELETE

var outputs = [];

const outputCreation = () => {
  // no parameters or functions just yet
  // we probably won't use all these variables,
  // but these are all the fields in a transaction
  var value = "0000000000000000";
  //value of the output in satoshis
  var scriptPubKeySize = "cc";
  //indicates the upcoming size of the locking code
  var scriptPubKey = "dd";
  // a script that locks the ouput
  outputs = outputs.concat(value, scriptPubKeySize, scriptPubKey);
  return outputs;
};

export default outputCreation;
