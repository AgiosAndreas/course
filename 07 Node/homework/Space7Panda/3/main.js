"use strict";

if (process.argv.length > 3) {
	throw new Error('to many arguments');
}

let Bruter = require('./brute.js')
let path = process.argv[2];

let sha256 = new Bruter;

sha256.bruteCatalog(path);