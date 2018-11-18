"use strict";
const G = require('generatorics');
const sha256 = require('js-sha256');
const FAIL = null;

class bruteSha256 {

	brute(code, letters) {
		
		if (code.lenght === 0 || letters.lenght === 0) {
			return FAIL;
		}

		for (var perm of G.permutation(letters)) {
		
			let word = perm.join("");
			let encodedWord = sha256(word);
		
			if (encodedWord == code) {
				return word;
			}
		}

		return FAIL;
	}

	bruteFile(fileName, content) {

		if (typeof content !== "string" || typeof fileName !== "string") {
			return FAIL;
		}

		content = content.split(" ");
		
		let code = content[0];
		let letters = content[1].split("");

		let word = this.brute(code, letters);

		let result = `${fileName} ${word} ${code}`;

		return result;
	}
}

module.exports = bruteSha256;