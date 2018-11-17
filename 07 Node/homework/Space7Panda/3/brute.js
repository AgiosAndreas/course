"use strict";
const G = require('generatorics');
const sha256 = require('js-sha256');
const fs = require('fs');

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

	bruteFile(folder, fileName) {
		let brute = this.brute;

		fs.readFile(folder + "//" + fileName, "utf8", function(err, content) {

				if (err) {
					throw new Error(err);
				}
				
				content = content.split(" ");
		
				let code = content[0];
				let letters = content[1].split("");
				
				let word = brute(code, letters);
				
				let result = fileName + " " + word + " " + code;
				
				console.log(result);
		})
	}
}

module.exports = bruteSha256;