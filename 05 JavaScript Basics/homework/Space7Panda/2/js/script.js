"use strict";
function sort(value) {
	
	let numberCheck = value.replace(/ /g, "");
		numberCheck = numberCheck.replace(/-/g, "");
		numberCheck = +numberCheck;

	if (isNaN(numberCheck) == true) {
		throw {"Message": "value is not a number"}
	}

	if (value.match(/[0-9]-/g)) {
		throw {"Message": "minus in the end of a number"}
	}

	if (value.match(/- /) || value.match(/ - /)) {
		throw {"Message": "minus without a number"}
	}

	value = value.trim().replace(/\s+/g, " ");

	if (value.length === 0) {
		return "[]";
	}

	let unsortNum = value.split(" ");
	let items = unsortNum.map((n, i) => n = {weight: n * (i + 1), value: n});

	items.sort((a, b) => {return (a.weight !== b.weight) ? b.weight - a.weight : b.number - a.number;});

	return items.map(num => num.value);
};
