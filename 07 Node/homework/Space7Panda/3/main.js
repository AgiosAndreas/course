"use strict";
if (process.argv.length > 3) {
	throw new Error('to many arguments');
}

const bruteSha256 = require('./brute.js')
const fs = require('fs');
const path = process.argv[2];
const sha256 = new bruteSha256;

/*
fs.readdir(path, 'utf-8', function (err, dirFiles) {

	if (err) {
		throw new Error(err);
	}

	for (var i = 0; i < dirFiles.length; i++) {
		sha256.bruteFile(path, dirFiles[i]);
	}
})
*/
console.log(sha256.bruteFile('kek', '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824 elloh'));
