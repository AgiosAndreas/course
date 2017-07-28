"use strict";

const DELIM_LETTER  = "   ";
const DELIM_WORD = "       ";
const ABC = {
	". -": "A",
	"- . . .": "B",
	"- . - .": "C",
	"- . .": "D",
	".": "E",
	". . - .": "F",
	"- - .": "G",
	". . . .": "H",
	". .": "I",
	". - - -": "J",
	"- . -": "K",
	". - . .": "L",
	"- -": "M",
	"- .": "N",
	"- - -": "O",
	". - - .": "P",
	"- - . -": "Q",
	". - .": "R",
	". . .": "S",
	"-": "T",
	". . -": "U",
	". . . -": "V",
	". - -": "W",
	"- . . -": "X",
	"- . - -": "Y",
	"- - . .": "Z",
	". - - - -": "1",
	". . - - -": "2",
	". . . - -": "3",
	". . . . -": "4",
	". . . . .": "5",
	"- . . . .": "6",
	"- - . . .": "7",
	"- - - . .": "8",
	"- - - - .": "9",
	"- - - - -": "0"
};

class MorseDecoder {

	decode(code) {

		if (typeof code !== "string") return "";

		code = code.trim();
		if (code.length === 0) return "";

		let suggestion = "";
		let noLetter = false;

		code.split(DELIM_WORD).map(function(word) {

			word.split(DELIM_LETTER).map(function(letter) {

				if (letter in ABC) {
					suggestion += ABC[letter];
				} else {
					noLetter = true;
				}
			});

			suggestion += " ";
		});

		if (noLetter) return "";

		return suggestion.slice(0, suggestion.length - 1);
	}

}

module.exports = MorseDecoder;
