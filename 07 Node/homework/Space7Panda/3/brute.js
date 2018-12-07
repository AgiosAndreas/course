"use strict";
const G = require('generatorics');
const sha256 = require('js-sha256');
const fs = require('fs-extra')
const FAIL = null;

class BruteSha256 {

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

	bruteFile(fileName, fileDir) {

		return fs.readFile(fileDir + "/" + fileName, "utf8").then(content => {

			content = content.split(" ");
			
			let code = content[0];
			let letters = content[1].split("");
	
			let word = this.brute(code, letters);
	
			let result = `${fileName} ${word} ${code}`;
			
			console.log(result);

			return result;
		})
	}

	bruteDir(path) {

		return fs.readdir(path, 'utf8').then(data => {

			let dirData = {
				files: data,
				path: path
			}

			console.log(`Successfully found ${dirData.files.length} files in catalog ${dirData.path}:`);
			console.log(dirData.files);

			return dirData;
		})
		.then(data => {

			console.log("\n bruting...\n");
	
			for (let i = 0; i < data.files.length; i++) {

				this.bruteFile(data.files[i], data.path);
			}

		})
	}
}

module.exports = BruteSha256;