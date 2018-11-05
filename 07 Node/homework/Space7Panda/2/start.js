"use strict";
let MorseDecoder = require("./decoder.js");
let morse = new MorseDecoder();

console.log(morse.decode('')); // ''
console.log(morse.decode(null)); // ''
console.log(morse.decode('. - - - -   - - - - - -  . - ---')); // ''
console.log(morse.decode('. . . .   .   . - . .   . - - .')); // 'HELP'
console.log(morse.decode('. . .   - - -   . . .')); // 'SOS'
console.log(morse.decode('. . . .   .   . - . .   . - . .   - - -       . - -   - - -   . - .   . - . .   - . .')); // 'HELLO WORLD'