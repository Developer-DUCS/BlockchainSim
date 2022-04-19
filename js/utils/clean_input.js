const escApos = (str) => {
  let aposarray = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] == "'") {
      aposarray.push(i);
    }
  }

  for (index in aposarray) {
    str = str.slice(0, aposarray[index]) + "\\" + str.slice(aposarray[index]);
    aposarray = aposarray.map(function (value) {
      return value + 1;
    });
  }
  return str;
};

const susInput = (inStr) => {
  var susChars = ["%", ";", "_", "*", "="];

  for (char in susChars) {
    if (inStr.includes(susChars[char])) {
      return true;
    }
  }
};

module.exports = { escApos, susInput };
