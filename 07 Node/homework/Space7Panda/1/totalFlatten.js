"use strict";
let flatten = require('./flatten.js');

function totalFlatten(arr) {

	if (!Array.isArray(arr)) {
		return arr;
	}

	while (arr.some(Array.isArray)) {
		arr = [].concat(flatten(arr));
	}

	return arr;
}

module.exports = totalFlatten;