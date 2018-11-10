"use strict";
class Decoder {
	
	constructor(ABC, SPLIT_LETTER, SPLIT_WORD) {
		this.ABC = ABC;
		this.SPLIT_LETTER = SPLIT_LETTER;
		this.SPLIT_WORD = SPLIT_WORD;
	}

	decode(code) {

		if (typeof code !== "string" || code == null) {
			return "";
		}

		code = code.trim();

		if (code.length === 0) {
			return "";
		}
		
		code = code.split(this.SPLIT_WORD);

		let	result = code.map(word => {

			let letters = word.split(this.SPLIT_LETTER);

			word = letters.map(letter => letter in this.ABC ? this.ABC[letter] : "").join("");
			
			return letters.length == word.length ? word : "";
		}).join(" ");
		
		return result;
	}
}

module.exports = Decoder;