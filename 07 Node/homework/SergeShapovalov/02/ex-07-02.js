"use strict";

let moduleMorse = require("./morse-decoder.js");

let morse = new moduleMorse.MorseDecoder();

console.log(morse.decode(""));
console.log(morse.decode(null));
console.log(morse.decode(".---- ------ .----"));
console.log(morse.decode(".... . .-.. .--."));
console.log(morse.decode("... --- ..."));
