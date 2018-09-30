"use strict";
function factorial(n) {
	if (Number.isInteger(n) === false || n < 0) {
		return;
	}

	return (n <= 1) ? 1 : n * factorial(n - 1);
};