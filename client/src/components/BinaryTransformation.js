//turn text into binary
function convertText2Binary(input) {
  var output = "";
  for (var i = 0; i < input.length; i++) {
    output += input[i].charCodeAt(0).toString(2) + " ";
  }
  return output;
}

//turn binary into text
function convertBinary2Text(input) {
  var output = input
    .split(" ")
    .map((bin) => String.fromCharCode(parseInt(bin, 2)))
    .join("");
  return output;
}

// TODO: check if this is string or format string(what is this?)
// turn hexadecimal into binary
function hex2bin(hex) {
  return ("00000000" + parseInt(hex, 16).toString(2)).substr(-8);
}

// turn hex to text
function hex2text(hexx) {
  var hex = hexx.toString(); //force conversion
  var str = "";
  for (var i = 0; i < hex.length; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}

var timeHex = "2b80475f";
var binary = convertText2Binary("text plain is longer");
console.log("binary file:", binary);
console.log("text file:", convertBinary2Text(binary));
var binaryTime = hex2bin(timeHex);
console.log("time trial binary: ", binaryTime);
var timeText = convertBinary2Text(binaryTime);
console.log("time text trial: ", hex2text(timeText));

/* 
  (function() {
    function chunk(str, size) {
      return str.match(new RegExp('.{1,' + size + '}', 'g'));
    }
    
    var str = 'HELLO WORLD';
    println('Simple binary representation:');
    println(chunk(textToBin(str), 8).join('\n'));
    println('\nNow for something crazy:');
    println(chunk(textToHex(str, 4), 8).map(function(h) { return '0x' + h }).join('  '));
    
    // Utiliy functions, you can ignore these.
    function textToBin(text) { return textToBase(text, 2, 8); }
    function textToHex(t, w) { return pad(textToBase(t,16,2), roundUp(t.length, w)*2, '00'); }
    function pad(val, len, chr) { return (repeat(chr, len) + val).slice(-len); }
    function print(text) { document.getElementById('out').innerHTML += (text || ''); }
    function println(text) { print((text || '') + '\n'); }
    function repeat(chr, n) { return new Array(n + 1).join(chr); }
    function textToBase(text, radix, n) {
      return text.split('').reduce(function(result, chr) {
        return result + pad(chr.charCodeAt(0).toString(radix), n, '0');
      }, '');
    }
    function roundUp(numToRound, multiple) { 
      if (multiple === 0) return numToRound;
      var remainder = numToRound % multiple;
      return remainder === 0 ? numToRound : numToRound + multiple - remainder;
    }
  }());
   */
