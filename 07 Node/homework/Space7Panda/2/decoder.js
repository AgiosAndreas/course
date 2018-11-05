"use strict";
const ABC          = require('./alphabet.json')
const SPLIT_LETTER = "   ";
const SPLIT_WORD   = "       ";

class MorseDecoder {

	decode(code) {

		if (typeof code !== "string" || code == null) {
			return "";
		}

		code = code.trim();

		if (code.length === 0) {
			return "";
		}

		code = code.split(SPLIT_WORD);

		let	result = code.map(word => {

			let letters = word.split(SPLIT_LETTER);

			word = letters.map(letter => letter in ABC ? ABC[letter] : "").join("");
			
			return letters.length == word.length ? word : "";
		}).join(" ");

		return result;
	}
}

module.exports = MorseDecoder;