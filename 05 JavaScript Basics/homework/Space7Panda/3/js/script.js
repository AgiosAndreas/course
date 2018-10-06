"use strict";
function ndigit(number, index) {
	try {

		if (Number.isInteger(number) === false ||
			Number.isInteger(index)  === false ) {
			
			throw {"Message":"value is not integer"};

		}
	
		number = Math.abs(number);
		let divider = Math.pow(10, index - 1);

		if (index < 1 || number < divider) {
			return -1;
		}

		return (number / divider | 0) % 10;

	} catch (e) {

		console.log("Error: " + e.Message);
		return;

	}
};