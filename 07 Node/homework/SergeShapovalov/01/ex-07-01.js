"use strict";

function totalFlatten(array) {

	if (array === null || typeof array !== "object") return null;
	if (array.length === 0) return [];

	let result = [];
	for (let i = 0; i < array.length; i++) {

		if (typeof array[i] === "object") {
			result = result.concat(totalFlatten(array[i]));
		} else {
			result.push(array[i]);
		}
	}
	return result;
}

console.log(totalFlatten(null));
console.log(totalFlatten("null"));
console.log(totalFlatten([]));
console.log(totalFlatten([1,2,3]));
console.log(totalFlatten([[1,2,3],["a","b","c"],[4,5,6]]));
console.log(totalFlatten([[[1,2,3]]]));
