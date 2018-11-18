"use strict";
if (process.argv.length > 3) {
	throw new Error('to many arguments');
}

const bruteSha256 = require('./brute.js')
const fs = require('fs');
const path = process.argv[2];
const sha256 = new bruteSha256;

const searchFiles = new Promise((success, fail) => {
	fs.readdir(path, 'utf-8', function (err, dirFiles) {

		if (err) {
			fail(err);
		}

		let data = {
			files: dirFiles,
			path: path
		}

		success(data);
	});
})

searchFiles
	.then(function(data) {
		console.log(`Successfully found ${data.files.length} files in catalog ${data.path}:`);
		console.log(data.files);
		return data;
})
	.then(function(data) {
		console.log("\n bruting...\n");

		for (let i = 0; i < data.files.length; i++) {

			fs.readFile(data.path + "//" + data.files[i], "utf8", function(err, content) {
				
				console.log(sha256.bruteFile(data.files[i], content));
			})
		}
})
	.catch(function(e) {
		console.log(e);
})