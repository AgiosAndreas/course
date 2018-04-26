'use strict';

function flatten(input) {

	if (!Array.isArray(input)) {
		return input;
	}

	return input.reduce((result, array) => {
		return result.concat(array);
	}, []);
}

function totalFlatten(input) {

	if (!Array.isArray(input)) {
		return input;
	}

	while (input.some(Array.isArray)) {
		input = [].concat(flatten(input));
	}

	return input;
}

console.log(flatten(null));
console.log(flatten('null'));
console.log(flatten([]));
console.log(flatten([1, 2, 3]));
console.log(flatten([[1, 2, 3], ["a", "b", "c"], [4, 5, 6]]));
console.log(flatten([[[1, 2, 3]]]));

console.log(totalFlatten(null));
console.log(totalFlatten('null'));
console.log(totalFlatten([]));
console.log(totalFlatten([[1, 2, 3], ["a", "b", "c"], [4, 5, 6]]));
console.log(totalFlatten([[[1, 2, 3]]]));
