"use strict";

let MorseDecoder = require("./morse-decoder.js");

let morse = new MorseDecoder();

console.log(morse.decode(""));
console.log(morse.decode(null));
console.log(morse.decode(". - - - -   - - - - - -  . - ---"));
console.log(morse.decode(". . . .   .   . - . .   . - - ."));
console.log(morse.decode(". . .   - - -   . . ."));

console.log(morse.decode(". . .   - - -   . . .       . . . .   .   . - . .   . - - ."));
