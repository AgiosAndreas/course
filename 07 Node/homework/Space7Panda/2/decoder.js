"use strict";
class Decoder {
	
	constructor(abc, split_letter, split_word) {
		this.abc = abc;
		this.split_letter = split_letter;
		this.split_word = split_word;
	}

	decode(code) {

		if (typeof code !== "string" || code == null) {
			return "";
		}

		code = code.trim();

		if (code.length === 0) {
			return "";
		}
		
		code = code.split(this.split_word);

		let	result = code.map(word => {

			let letters = word.split(this.split_letter);

			word = letters.map(letter => letter in this.abc ? this.abc[letter] : "").join("");
			
			return letters.length == word.length ? word : "";
		}).join(" ");
		
		return result;
	}
}

module.exports = Decoder;