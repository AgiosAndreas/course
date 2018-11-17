"use strict";
let Decoder = require("./decoder.js");

let abc = require('./abc/alphabet.json');
let split_letter = "   ";
let split_word = "       ";

let abc_RU = require('./abc/alphabetRU.json');
let split_letter_RU = "  ";
let split_word_RU = "    ";

let morse = new Decoder(abc, split_letter, split_word);
let morseRU = new Decoder(abc_RU, split_letter_RU, split_word_RU);

console.log(morse.decode('')); // ''
console.log(morse.decode(null)); // ''
console.log(morse.decode('. - - - -   - - - - - -  . - ---')); // ''
console.log(morse.decode('. . . .   .   . - . .   . - - .   . . - - . .')); // 'HELP?'
console.log(morse.decode('. . .   - - -   . . .')); // 'SOS'
console.log(morse.decode('. . . .   .   . - . .   . - . .   - - -       . - -   - - -   . - .   . - . .   - . .   - - . . - -')); // 'HELLO WORLD!'

console.log(morseRU.decode('. - - .  . - .  . .  . - -  .  -    - -  . .  . - .  - - . . - -')); // 'ПРИВЕТ МИР!'
console.log(morseRU.decode('. - - - - .  . - . -  . - . - . -    . - -  . -  . . .  . - . -  . . . . . .  . - - - - .')); // 