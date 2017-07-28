"use strict";

function flatten(array, total = false) {

	if (!Array.isArray(array)) return null;
	if (array.length === 0) return [];

	let flatArray = [];

	array.map(function(item) {
		if (Array.isArray(item)) {
			flatArray =  flatArray.concat(total ? flatten(item) : item);
		} else {
			flatArray.push(item);
		}
	});

	return flatArray;
}

console.log(flatten(null));
console.log(flatten("null"));
console.log(flatten([]));
console.log(flatten([1,2,3]));
console.log(flatten([[1,2,3],["a","b","c"],[4,5,6]]));
console.log(flatten([[[1,2,3]]]));

console.log(flatten([[[1,2,3]]], true));
