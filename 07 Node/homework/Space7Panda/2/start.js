"use strict";
let MorseDecoder = require("./decoder.js");
let morse = new MorseDecoder();

morse.decode(''); // ''
morse.decode(null); // ''
morse.decode('. - - - -   - - - - - -  . - ---'); // ''
morse.decode('. . . .   .   . - . .   . - - .'); // 'HELP'
morse.decode('. . .   - - -   . . .'); // 'SOS'