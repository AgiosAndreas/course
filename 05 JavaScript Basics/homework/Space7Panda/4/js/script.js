"use strict";
function factorial(n) {

	if (Number.isInteger(n) === false) {
		throw {"Error": "'n' - is not a number"};
	}

	if (n < 0) {
		throw {"Error": "n < 0"};
	}

	return (n <= 1) ? 1 : n * factorial(n - 1);
};