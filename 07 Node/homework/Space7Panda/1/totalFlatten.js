"use strict";
function totalFlatten(arr) {

	if (!Array.isArray(arr)) {
		return arr;
	}

	return arr.reduce(function (acc, val) {
		return acc.concat(totalFlatten(val));
	}, []);
}

module.exports = totalFlatten;