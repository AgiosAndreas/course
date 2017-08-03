"use strict";

if (process.argv.length <= 2) {
	console.log("Usage: " + __filename + " path/to");
	process.exit(-1);
}

const fs = require("fs");
const path = require("path");

const directory = process.argv[2];

const BruteForceSHA256 = require("./brute-force-sha256.js");
let bruteForce = new BruteForceSHA256();

fs.readdir(directory, function(error, items) {
	if (error) throw error;

	for (var i = 0; i < items.length; i++) {

		fs.readFile(directory + path.sep + items[i], "utf8", function(error, data) {
			if (error) throw error;
			console.log(bruteForce.fileProcessing(this, data));
		}.bind(items[i]));

	}
});
