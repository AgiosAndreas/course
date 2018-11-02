"use strict";
function flatten(arr) {

	if (!Array.isArray(arr)) {
		return arr;
	}

	return arr.reduce(function (acc, val) {
  		return acc.concat(val);
	}, []);
};

module.exports = flatten;