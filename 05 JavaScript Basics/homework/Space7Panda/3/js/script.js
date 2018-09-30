"use strict";
function ndigit(number, index) {
	
	if (Number.isInteger(number) === false ||
		Number.isInteger(index)  === false )
	{
		return;
	}

	number = Math.abs(number);
	let divider = Math.pow(10, index - 1);

	if (index < 1 || number < divider) {
		return -1;
	}

	return (number / divider | 0) % 10;
};