"use strict";
const fs = require('fs');
let bruteSha256 = require('./brute.js')
let path = process.argv[2];


fs.readdir(path, 'utf-8', function (err, dirFiles) {
	if (err) {
		return console.log(err)
	}

	for (var i = 0; i < dirFiles.length; i++) {
		fileProcessing(path, dirFiles[i]);
	}
})

function fileProcessing(path, fileName) {
	fs.readFile(path + "//" + fileName, "utf8", function(err, content){
		if (err) {
			return console.log(err)
		}

		content = content.split(" ");
		let code = content[0];
		let letters = content[1].split("");

		let word = bruteSha256(code, letters);

		if (word == undefined) {
			word = null;
		}
		
		let result = fileName + " " + word + " " + code;
		
		console.log(result);
	})
}
