"use strict";

class MorseDecod {
    decode(morseCode) {


        let lettersSpace = "   ";
let wordSpace = "       ";
let alphabet = {
    // letters
    ". -": "a",
    "- . . .": "b",
    "- . - .": "c",
    "- . .": "d",
    ".": "e",
    ". . - .": "f",
    "- - .": "g",
    ". . . .": "h",
    ". .": "i",
    ". - - -": "j",
    "- . -": "k",
    ". - . .": "l",
    "- -": "m",
    "- .": "n",
    "- - -": "o",
    ". - - .": "p",
    "- - . -": "q",
    ". - .": "r",
    ". . .": "s",
    "-": "t",
    ". . -": "u",
    ". . . -": "v",
    ". - -": "w",
    "- . . -": "x",
    "- . - -": "y",
    "- - . .": "z",
    ". - - - -": "1",
    ". . - - -": "2",
    ". . . - -": "3",
    ". . . . -": "4",
    ". . . . .": "5",
    "- . . . .": "6",
    "- - . . .": "7",
    "- - - . .": "8",
    "- - - - .": "9",
    "- - - - -": "0",
    ". - . - . -": ".",
    "- - . . - -": ",",
    ".. - - . .": "?",
    ". - - - - .": "\'",
    "-. - . - -": "!",
    "- . . - .": "/",
    "- . - - .": "(",
    "- . - - . -": ")",
    ". - . . .": "&",
    "- - - . . .": ":",
    "- . - . - .": ";",
    "- . . . -": "=",
    ". - . - .": "+",
    "- . . . . ": "- ",
    ". . - - . -": "_",
    ". - . . - .": "\"",
    ". . . - . . -": "$",
    ". - - . - .": "@",
};

        if (typeof morseCode !== "string")
            return " ";
        morseCode = morseCode.trim();

        if (morseCode.length == 0)
            return " ";

        let decodeResult = morseCode.split(wordSpace).map(function (word) {
            let letters = word.split(lettersSpace);
            return word = letters.map(function (word) {
                return word in alphabet ? alphabet[word] : ""
            }).join(""), letters.length == word.length ? word : ""
        })
            .join(" ");

        return decodeResult;
    }

}

module.exports = MorseDecod;
