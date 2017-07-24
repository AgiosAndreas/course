"use strict";

if (process.argv.length <= 2) {
	console.log("Usage: " + __filename + " path/to");
	process.exit(-1);
}

const FAILURE = null;

let fs = require("fs");
let sha256 = require("js-sha256");
let combinatorics = require("js-combinatorics");

let path = process.argv[2];

fs.readdir(path, function(error, items) {
	if (error) throw error;

	for (var i = 0; i < items.length; i++) {
		fileProcessing(path, items[i]);
	}
});

//------------------------------------------------------------------------------

function fileProcessing(path, fileName) {
	fs.readFile(path + "\\" + fileName, "utf8", function(error, data){
		if (error) throw error;

		let password = FAILURE;
		let hash = "file type mismatch";

		if (typeof data === "string") {
			data = data.trim().split(" ");
			if (data.length >= 2) {
				hash = data[0];
				password = bruteForce(hash, data[1].split(""));
			}
		}

		console.log(fileName + " " + password + " " + hash);
	});
}

//------------------------------------------------------------------------------

function bruteForce(hash, letters) {

	if (letters.length === 0 || hash.length === 0) return FAILURE;

	let combination = combinatorics.permutation(letters).toArray();

	for (let i = 0; i < combination.length; i++) {
		let password = combination[i].join("");
		if (sha256(password) === hash) return password;
	}

	return FAILURE;
}
