"use strict";

function flatten(array, total = false) {

	if (!Array.isArray(array)) return null;
	if (array.length === 0) return [];

	let result = [].concat.apply([], array);

	return total && result.some(Array.isArray) ? flatten(result, true) : result;
}

console.log(flatten(null));
console.log(flatten("null"));
console.log(flatten([]));
console.log(flatten([1,2,3]));
console.log(flatten([[1,2,3],["a","b","c"],[4,5,6]]));
console.log(flatten([[[1,2,3]]]));

console.log(flatten([[[1,2,3]]], true));
