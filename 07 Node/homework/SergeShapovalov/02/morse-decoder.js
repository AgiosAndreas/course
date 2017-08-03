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

		let result = code.split(DELIM_WORD).map(function(word) {

			let letters = word.split(DELIM_LETTER);

			word = letters.map(function(letter) {
				return letter in ABC ? ABC[letter] : "";
			}).join("");

			return letters.length == word.length ? word : "";
		}).join(" ");

		return result;
	}

}

module.exports = MorseDecoder;
