"use strict";
let Decoder = require("./decoder.js");

let ABC = require('./alphabet.json');
let SPLIT_LETTER = "   ";
let SPLIT_WORD = "       ";

let ABC_RU = require('./alphabetRU.json');
let SPLIT_LETTER_RU = "  ";
let SPLIT_WORD_RU = "    ";

let morse = new Decoder(ABC, SPLIT_LETTER, SPLIT_WORD);
let morseRU = new Decoder(ABC_RU, SPLIT_LETTER_RU, SPLIT_WORD_RU);

console.log(morse.decode('')); // ''
console.log(morse.decode(null)); // ''
console.log(morse.decode('. - - - -   - - - - - -  . - ---')); // ''
console.log(morse.decode('. . . .   .   . - . .   . - - .')); // 'HELP'
console.log(morse.decode('. . .   - - -   . . .')); // 'SOS'
console.log(morse.decode('. . . .   .   . - . .   . - . .   - - -       . - -   - - -   . - .   . - . .   - . .')); // 'HELLO WORLD'

console.log(morseRU.decode('. - - .  . - .  . .  . - -  .  -    - -  . .  . - .')); // 'ПРИВЕТ МИР'
