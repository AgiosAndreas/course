"use strict";

const sha256 = require("js-sha256");
const combinatorics = require("js-combinatorics");

const FAILURE = null;

class BruteForceSHA256 {

	fileProcessing(fileName, data) {

		let password = FAILURE;
		let hash = "file type mismatch";

		if (typeof data === "string") {
			data = data.trim().split(" ");
			if (data.length >= 2) {
				hash = data[0];
				password = this.bruteForce(hash, data[1].split(""));
			}
		}

		return fileName + " " + password + " " + hash;
	}

	//----------------------------------------------------------------------------

	bruteForce(hash, letters) {

		if (letters.length === 0 || hash.length === 0) return FAILURE;

		let combination = combinatorics.permutation(letters).toArray();

		for (let i = 0; i < combination.length; i++) {
			let password = combination[i].join("");
			if (sha256(password) === hash) return password;
		}

		return FAILURE;
	}

}

module.exports = BruteForceSHA256;
