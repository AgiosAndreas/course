"use strict";
if (process.argv.length > 3) {
	throw new Error('to many arguments');
}

const bruteSha256 = require('./brute.js')
const fs = require('fs-extra')
const path = process.argv[2];
const sha256 = new bruteSha256;

fs.readdir(path, 'utf8')
.then(data => {

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

		fs.readFile(data.path + "//" + data.files[i], "utf8").then(content => {
			console.log(sha256.bruteFile(data.files[i], content));
		})
	}
})
.catch(err => {
	console.error(err)
})