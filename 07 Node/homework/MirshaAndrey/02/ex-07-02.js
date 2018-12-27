"use strict";

let MorseDecod = require("./morseDecod.js");

let morse = new MorseDecod();

console.log(morse.decode(". .       . - . .   - - -   . . . -   .       - .   - - -   - . .   .   . - - -   . . .   . - . - . -   -. - . - -   -. - . - -   -. - . - -")); //i love nodejs.!!!
console.log(morse.decode(". . . .   .   . - . .   . - - .")); // 'HELP'
console.log(morse.decode(". . .   - - -   . . .")); // 'SOS'
console.log(morse.decode(". - - - -   - - - - - -  . - ---")); // ''
console.log(morse.decode("- - - - - -"));
console.log(morse.decode(""));
console.log(morse.decode(null));
