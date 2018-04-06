var express = require('express');
var app = express();
var path = require('path');


// LOCAL VARIABLES

var uID = 10002;
var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
var base = alphabet.length;


// ENCODE (base 10 integer to base 58 string)

function encode(num) {
var encoded ="";
  
  while (num) {
  var remainder = num % base;
  num = Math.floor(num/base);
  encoded = alphabet[remainder].toString() + encoded; 
  }

  return encoded;
}


// DECODE (base 58 string to base 10 integer)

function decode(str) {
var decoded = 0;
 
  while (str) {
  var index = alphabet.indexOf(str[0]);
  var power = str.length -1;
  decoded += index * (Math.pow (base, power));
  str = str.substring(1);
  }

  return decoded;
}


module.exports.encode = encode;
module.exports.decode = decode;


/////////////////////////////////////////////////////////////

/*
 Ejemplo de covnersión 10002 a 3Ys:

 num = 10002 
 rem = 26   - 56
 num = 172  -  3
 encoded = 3Ys

 str[0]  = 3      - Y     - s
 index   = 2      - 56    - 26
 power   = 2      - 1     - 0
 decoded = 6728   - 3248  - 26 = 10002

 */