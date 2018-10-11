"use strict";
let sort = (value) => {
	value = value.replace(/[^-0-9]/gim, " ");
	value = value.trim().replace(/\s+/g, " ");

	if (value.length === 0) {
		return '[]';
	}

	let unsortNum = value.split(" ");
	let items = unsortNum.map((n, i) => n = {weight: n * (i + 1), value: n});

	items.sort((a, b) => {return (a.weight !== b.weight) ? b.weight - a.weight : b.number - a.number;});

	return items.map(num => num.value);
};
