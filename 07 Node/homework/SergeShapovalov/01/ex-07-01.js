"use strict";

function flatten(array, total = false) {

	if (!Array.isArray(array)) return null;
	if (array.length === 0) return [];

	let flattenArray = [].concat.apply([], array);

	if (total) {

		let totalFlatten = flattenArray.some(function(item) {
			return Array.isArray(item);
		});

		if (totalFlatten) flattenArray = flatten(flattenArray, true);
	}

	return flattenArray;
}

console.log(flatten(null));
console.log(flatten("null"));
console.log(flatten([]));
console.log(flatten([1,2,3]));
console.log(flatten([[1,2,3],["a","b","c"],[4,5,6]]));
console.log(flatten([[[1,2,3]]]));

console.log(flatten([[[1,2,3]]], true));
