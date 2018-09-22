"use strict";
let factorial = (n) => {
	if (isNaN(n) === true || n < 0 || Number.isInteger(n) === false) {
		return;
	}

	return (n <= 1) ? 1 : n * factorial(n - 1);
};