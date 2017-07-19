"use strict";

class MorseDecoder {

	constructor(delimiter = " ", point = ".", dash = "-") {

		this.point = point;
		this.dash = dash;
		this.delimLetter = delimiter;
		this.delimWord = delimiter + delimiter + delimiter;

		this.abc = {
			A: [0, 1],
			B: [1, 0, 0, 0],
			C: [1, 0, 1, 0],
			D: [1, 0, 0],
			E: [0],
			F: [0, 0, 1, 0],
			G: [1, 1, 0],
			H: [0, 0, 0, 0],
			I: [0, 0],
			J: [0, 1, 1, 1],
			K: [1, 0, 1],
			L: [0, 1, 0, 0],
			M: [1, 1],
			N: [1, 0],
			O: [1, 1, 1],
			P: [0, 1, 1, 0],
			Q: [1, 1, 0, 1],
			R: [0, 1, 0],
			S: [0, 0, 0],
			T: [1],
			U: [0, 0, 1],
			V: [0, 0, 0, 1],
			W: [0, 1, 1],
			X: [1, 0, 0, 1],
			Y: [1, 0, 1, 1],
			Z: [1, 1, 0, 0],
			1: [0, 1, 1, 1, 1],
			2: [0, 0, 1, 1, 1],
			3: [0, 0, 0, 1, 1],
			4: [0, 0, 0, 0, 1],
			5: [0, 0, 0, 0, 0],
			6: [1, 0, 0, 0, 0],
			7: [1, 1, 0, 0, 0],
			8: [1, 1, 1, 0, 0],
			9: [1, 1, 1, 1, 0],
			0: [1, 1, 1, 1, 1]
		};

		for (let key in this.abc) {
			this.abc[key] = this.abc[key].join("").replace(/0/g, point).replace(/1/g, dash);
		}
	}

	//----------------------------------------------------------------------------

	decode(code) {

		code = this.checkString(code);
		if (code.length === 0) return "";

		let words = code.split(this.delimWord);

		let suggestion = "";
		for (let i = 0; i < words.length; i++) {

			let word = words[i].split(this.delimLetter);

			for (let j = 0; j < word.length; j++) {

				let letter = this.findLetter(word[j]);
				if (letter === "") return "";
				suggestion += letter;
			}
			suggestion += " ";
		}
		return suggestion.trim();
	}

	//----------------------------------------------------------------------------

	encode(suggestion) {

		suggestion = this.checkString(suggestion);
		if (suggestion.length === 0) return "";
		suggestion = suggestion.toUpperCase();

		let code = "";
		for (let i = 0; i < suggestion.length; i++) {

			if (suggestion[i] === " ") {
				code = code.slice(0, code.length - 1) + this.delimWord;
				continue;
			}

			if (suggestion[i] in this.abc) {
				code += this.abc[suggestion[i]];
				if (i < suggestion.length - 1) code += this.delimLetter;
			}
		}
		return code;
	}

	//----------------------------------------------------------------------------

	checkString(str) {

		if (typeof str !== "string") return "";
		return str.trim();
	}

	//----------------------------------------------------------------------------

	findLetter(letter) {

		for (let key in this.abc) {
			if (this.abc[key] == letter) return key;
		}
		return "";
	}

	//----------------------------------------------------------------------------

}

module.exports.MorseDecoder = MorseDecoder;
