"use strict";
const G = require('generatorics');
const sha256 = require('js-sha256');

function bruteSha256(code, letters) {

	for (var perm of G.permutation(letters)) {

		let word = perm.join("");
		let encodedWord = sha256(word);

		if (encodedWord == code) {
			return word;
		}
	}
}

module.exports = bruteSha256;