"use strict";
function flatten(arr) {

	if (!Array.isArray(arr)) {
		return arr;
	}

	return arr.flat();
};

module.exports = flatten;