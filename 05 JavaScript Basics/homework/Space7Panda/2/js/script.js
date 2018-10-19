"use strict";
function sort(value) {
	
	let numberCheck = value.replace(/ -/g, "").replace(/ /g, "");

	if (isNaN(numberCheck) == true) {
		throw {"Message": "value is not a number"}
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
