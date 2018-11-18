"use strict";
const G = require('generatorics');
const sha256 = require('js-sha256');

class bruteSha256 {

	brute(code, letters) {

		for (var perm of G.permutation(letters)) {
		
			let word = perm.join("");
			let encodedWord = sha256(word);
		
			if (encodedWord == code) {
				return word;
			}
		}

		return null;
	}

	bruteFile(fileName, content) {

		if (typeof content !== "string") {
			throw new Error("Not a string");
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