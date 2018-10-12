"use strict";
function ndigit(number, index) {
	try {

		if (Number.isInteger(number) === false) {
			throw {"Message":"first value is not a number"};
		}

		if (Number.isInteger(index)  === false ) {
			throw {"Message":"second value is not a number"};
		}
	
		number = Math.abs(number);
		let divider = Math.pow(10, index - 1);

		if (index < 1 || number < divider) {
			return -1;
		}

		return (number / divider | 0) % 10;

	} catch (e) {
		console.log("Error: " + e.Message);
	}
};