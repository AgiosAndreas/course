"use strict";
if (process.argv.length > 3) {
	throw new Error('to many arguments');
}

const bruteSha256 = require('./brute.js')
const fs = require('fs');
const path = process.argv[2];
const sha256 = new bruteSha256;

fs.readdir(path, 'utf-8', function (err, dirFiles) {

	if (err) {
		throw new Error(err);
	}

	for (var i = 0; i < dirFiles.length; i++) {
		sha256.bruteFile(path, dirFiles[i]);
	}
})