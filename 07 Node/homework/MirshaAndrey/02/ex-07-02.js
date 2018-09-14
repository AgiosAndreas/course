"use strict";

let Morse_convert = require("./morseDecod.js");

let morse = new Morse_convert();

console.log(morse.decode(". .       . - . .   - - -   . . . -   .       - .   - - -   - . .   .   . - - -   . . .   . - . - . -   -. - . - -   -. - . - -   -. - . - -"));
console.log(morse.decode(". . . .   .   . - . .   . - - .")); // 'HELP'
console.log(morse.decode(". . .   - - -   . . .")); // 'SOS'
console.log(morse.decode(". - - - -   - - - - - -  . - ---")); // ''
console.log(morse.decode("- - - - - -"));
console.log(morse.decode(""));
console.log(morse.decode(null));