"use strict";

class MorseDecoder {

	constructor() {

		MorseDecoder.DELIM_LETTER  = "   ";
		MorseDecoder.DELIM_WORD = "       ";

		MorseDecoder.ABC = {
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
	}

	//----------------------------------------------------------------------------

	decode(code) {

		if (typeof code !== "string") return "";
		code = code.trim();
		if (code.length === 0) return "";

		let words = code.split(MorseDecoder.DELIM_WORD);

		let suggestion = "";
		for (let i = 0; i < words.length; i++) {

			let word = words[i].split(MorseDecoder.DELIM_LETTER);

			for (let j = 0; j < word.length; j++) {
				if (!(word[j] in MorseDecoder.ABC)) return "";
				suggestion += MorseDecoder.ABC[word[j]];
			}

			if (i < words.length - 1) suggestion += " ";
		}
		return suggestion;
	}
}

module.exports = MorseDecoder;
