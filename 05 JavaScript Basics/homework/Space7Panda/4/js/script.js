"use strict";
function factorial(n) {
	try {

		if (Number.isInteger(n) === false) {
			throw {"Message": "'n' - is not a number"};
		}
		
		if (n < 0) {
			throw {"Message": "n < 0"};
		}

		return (n <= 1) ? 1 : n * factorial(n - 1);

	} catch (e) {

		console.log("Error: " + e.Message);
	}
};