"use strict";
let factorial = (n) => {
	if (isNaN(n) === true || Number.isInteger(n) === false || n < 0) {
		return;
	}

	return (n <= 1) ? 1 : n * factorial(n - 1);
};