"use strict";
if (process.argv.length > 3) {
	throw new Error('to many arguments');
}

const BruteSha256 = require('./brute.js')
const path = process.argv[2];
const sha256 = new BruteSha256;

sha256.bruteDir(path);