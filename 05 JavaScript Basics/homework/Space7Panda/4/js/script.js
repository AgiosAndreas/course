"use strict";
function factorial(n) {
	try {
		
		if (Number.isInteger(n) === false || n < 0) {
			throw {"Message": "'n' - is not integer or 'n < 0'"};
		}
	
		return (n <= 1) ? 1 : n * factorial(n - 1);

	} catch (e) {

		console.log("Error: " + e.Message);
		return;
	}

};