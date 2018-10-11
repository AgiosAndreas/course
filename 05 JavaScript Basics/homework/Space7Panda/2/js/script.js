"use strict";
function sort(value) {
	try {
		let numberCheck = value.replace(/ /g, "");
			numberCheck = numberCheck.replace(/-/g, "");
			numberCheck = +numberCheck;

		if (isNaN(numberCheck) == true) {
			throw {"Message": "incorrect input value"}
		}

		if (value.match(/[0-9]-/g)) {
			throw {"Message": "minus in end of number"}
		}

		if (value.match(/ - /)) {
			throw {"Message": "minus without number"}
		}
		
	} catch (e) {
		console.log("Error: " + e.Message);
		return;
	}

	value = value.trim().replace(/\s+/g, " ");

	if (value.length === 0) {
		return '[]';
	}

	let unsortNum = value.split(" ");
	let items = unsortNum.map((n, i) => n = {weight: n * (i + 1), value: n});

	items.sort((a, b) => {return (a.weight !== b.weight) ? b.weight - a.weight : b.number - a.number;});

	return items.map(num => num.value);
};
