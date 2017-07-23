"use strict";

function flatten(array) {

	if (!Array.isArray(array)) return null;
	if (array.length === 0) return [];

	let flatArray = [];
	for (let i = 0; i < array.length; i++) {

		if (Array.isArray(array[i])) {
			flatArray = flatArray.concat(array[i]);
		} else {
			flatArray.push(array[i]);
		}
	}
	return flatArray;
}

//------------------------------------------------------------------------------

function totalFlatten(array) {

	if (!Array.isArray(array)) return null;
	if (array.length === 0) return [];

	let flatArray = [];
	for (let i = 0; i < array.length; i++) {

		if (Array.isArray(array[i])) {
			flatArray = flatArray.concat(totalFlatten(array[i]));
		} else {
			flatArray.push(array[i]);
		}
	}
	return flatArray;
}

//------------------------------------------------------------------------------

console.log(flatten(null));
console.log(flatten("null"));
console.log(flatten([]));
console.log(flatten([1,2,3]));
console.log(flatten([[1,2,3],["a","b","c"],[4,5,6]]));
console.log(flatten([[[1,2,3]]]));

console.log(totalFlatten([[[1,2,3]]]));
