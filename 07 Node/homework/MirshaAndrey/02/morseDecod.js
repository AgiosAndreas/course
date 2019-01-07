"use strict"
        const lettersSpace = "   "
        const wordSpace = "       "
        const alphabet = {
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
            ". - - - - .": "'",
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
            ". - . . - .": '"',
            ". . . - . . -": "$",
            ". - - . - .": "@",
        }
class MorseDecod {
    decode(morseCode) {

        if (typeof morseCode !== "string") return " "
        morseCode = morseCode.trim()

        if (morseCode.length == 0) return ""

        morseCode = morseCode
            .split(wordSpace)
            .map(function(word) {
                let letters = word.split(lettersSpace)

                word = letters
                    .map(word => (word in alphabet ? alphabet[word] : ""))
                    .join("")

                let lettersLength = letters.length == word.length ? word : ""

                return word, lettersLength
            })
            .join(" ")

        return morseCode
    }
}
module.exports = MorseDecod